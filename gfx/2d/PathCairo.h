/* -*- Mode: C++; tab-width: 20; indent-tabs-mode: nil; c-basic-offset: 2 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef MOZILLA_GFX_PATH_CAIRO_H_
#define MOZILLA_GFX_PATH_CAIRO_H_

#include "2D.h"
#include "cairo.h"

namespace mozilla {
namespace gfx {

class DrawTargetCairo;

// A reference to a cairo context that can maintain and set a path.
//
// This class exists to make it possible for us to not construct paths manually
// using cairo_path_t, which in the common case is a speed and memory
// optimization (as the cairo_t maintains the path for us, and we don't have to
// use cairo_append_path). Instead, we can share a cairo_t with a DrawTarget,
// and have it inform us when we need to make a copy of the path.
//
// Exactly one Path* object represents the current path on a given DrawTarget's
// context. That Path* object registers its CairoPathContext with the
// DrawTarget it's associated with. If that DrawTarget is going to change its
// path, it has to tell the CairoPathContext beforehand so the path can be
// saved off.
// The path ownership is transferred to every new instance of CairoPathContext
// in the constructor. We inform the draw target of the new context object,
// which causes us to save off a copy of the path, as we're not going to be
// informed upon changes any more.
// Any transformation on aCtx is not applied to this path, though a path can be
// transformed separately from its context by passing a matrix to the
// constructor.
class CairoPathContext : public RefCounted<CairoPathContext>
{
public:
  // Construct a new empty CairoPathContext that uses the given draw target and
  // its cairo context. Using the existing context may save having to copy the
  // path later.
  CairoPathContext(cairo_t* aCtx, DrawTargetCairo* aDrawTarget);

  // Copy the path.
  CairoPathContext(CairoPathContext& aPathContext);

  ~CairoPathContext();

  // Copy the path on mContext to be the path on aToContext, if they aren't the
  // same. At this point we set the fill rule for the destination context as
  // there is little point in doing this earlier.
  void CopyPathTo(cairo_t* aToContext, Matrix& aTransform);

  // This method must be called by the draw target before it changes the path
  // currently on the cairo context.
  void PathWillChange();

  // This method must be called as the draw target is dying. In this case, we
  // forget our reference to the draw target, and become the only reference to
  // our context.
  void ForgetDrawTarget();

  // Create a duplicate context, and copy this path to that context.
  void DuplicateContextAndPath();

  // Returns true if this CairoPathContext represents path.
  bool ContainsPath(const Path* path);

  cairo_t* GetContext() const { return mContext; }
  DrawTargetCairo* GetDrawTarget() const { return mDrawTarget; }
  operator cairo_t* () const { return mContext; }

private: // data
  cairo_t* mContext;
  // Not a RefPtr to avoid cycles.
  DrawTargetCairo* mDrawTarget;
};

class PathBuilderCairo : public PathBuilder
{
public:
  // Creates a new empty path. It also implicitly takes ownership of aCtx by
  // calling aDrawTarget->SetPathObserver(). Therefore, if the draw target has a
  // path observer, this constructor will cause it to copy out its path.
  PathBuilderCairo(cairo_t* aCtx, DrawTargetCairo* aDrawTarget, FillRule aFillRule);

  // Creates a path builder out of an existing CairoPathContext with a new fill
  // rule and transform.
  PathBuilderCairo(CairoPathContext* aContext, FillRule aFillRule, const Matrix& aTransform = Matrix());

  virtual void MoveTo(const Point &aPoint);
  virtual void LineTo(const Point &aPoint);
  virtual void BezierTo(const Point &aCP1,
                        const Point &aCP2,
                        const Point &aCP3);
  virtual void QuadraticBezierTo(const Point &aCP1,
                                 const Point &aCP2);
  virtual void Close();
  virtual void Arc(const Point &aOrigin, float aRadius, float aStartAngle,
                   float aEndAngle, bool aAntiClockwise = false);
  virtual Point CurrentPoint() const;
  virtual TemporaryRef<Path> Finish();

  TemporaryRef<CairoPathContext> GetPathContext();

private: // data
  void PrepareForWrite();

  RefPtr<CairoPathContext> mPathContext;
  Matrix mTransform;
  FillRule mFillRule;
};

class PathCairo : public Path
{
public:
  PathCairo(CairoPathContext* aPathContex, Matrix& aTransform, FillRule aFillRule);

  virtual BackendType GetBackendType() const { return BACKEND_CAIRO; }

  virtual TemporaryRef<PathBuilder> CopyToBuilder(FillRule aFillRule = FILL_WINDING) const;
  virtual TemporaryRef<PathBuilder> TransformedCopyToBuilder(const Matrix &aTransform,
                                                             FillRule aFillRule = FILL_WINDING) const;

  virtual bool ContainsPoint(const Point &aPoint, const Matrix &aTransform) const;

  virtual Rect GetBounds(const Matrix &aTransform = Matrix()) const;

  virtual Rect GetStrokedBounds(const StrokeOptions &aStrokeOptions,
                                const Matrix &aTransform = Matrix()) const;

  virtual FillRule GetFillRule() const { return mFillRule; }

  TemporaryRef<CairoPathContext> GetPathContext();

  // Set this path to be the current path for aContext (if it's not already
  // aContext's path). You must pass the draw target associated with the
  // context as aDrawTarget.
  void CopyPathTo(cairo_t* aContext, DrawTargetCairo* aDrawTarget);

private:
  RefPtr<CairoPathContext> mPathContext;
  Matrix mTransform;
  FillRule mFillRule;
};

}
}

#endif /* MOZILLA_GFX_PATH_CAIRO_H_ */
