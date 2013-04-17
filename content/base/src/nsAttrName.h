/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*
 * Class that represents the name (nodeinfo or atom) of an attribute;
 * using nodeinfos all the time is too slow, so we use atoms when we
 * can.
 */

#ifndef nsAttrName_h___
#define nsAttrName_h___

#include "nsINodeInfo.h"
#include "nsIAtom.h"
#include "nsDOMString.h"

typedef PRUptrdiff PtrBits;

#define NS_ATTRNAME_NODEINFO_BIT 1
class nsAttrName
{
public:
  nsAttrName(const nsAttrName& aOther)
    : mBits(aOther.mBits)
  {
    AddRefInternalName();
  }

  explicit nsAttrName(nsIAtom* aAtom)
    : mBits(reinterpret_cast<PtrBits>(aAtom))
  {
    NS_ASSERTION(aAtom, "null atom-name in nsAttrName");
    NS_ADDREF(aAtom);
  }

  explicit nsAttrName(nsINodeInfo* aNodeInfo)
  {
    NS_ASSERTION(aNodeInfo, "null nodeinfo-name in nsAttrName");
    if (aNodeInfo->NamespaceEquals(kNameSpaceID_None)) {
      mBits = reinterpret_cast<PtrBits>(aNodeInfo->NameAtom());
      NS_ADDREF(aNodeInfo->NameAtom());
    }
    else {
      mBits = reinterpret_cast<PtrBits>(aNodeInfo) |
              NS_ATTRNAME_NODEINFO_BIT;
      NS_ADDREF(aNodeInfo);
    }
  }

  ~nsAttrName()
  {
    ReleaseInternalName();
  }

  void SetTo(nsINodeInfo* aNodeInfo)
  {
    NS_ASSERTION(aNodeInfo, "null nodeinfo-name in nsAttrName");

    ReleaseInternalName();
    if (aNodeInfo->NamespaceEquals(kNameSpaceID_None)) {
      mBits = reinterpret_cast<PtrBits>(aNodeInfo->NameAtom());
      NS_ADDREF(aNodeInfo->NameAtom());
    }
    else {
      mBits = reinterpret_cast<PtrBits>(aNodeInfo) |
              NS_ATTRNAME_NODEINFO_BIT;
      NS_ADDREF(aNodeInfo);
    }
  }

  void SetTo(nsIAtom* aAtom)
  {
    NS_ASSERTION(aAtom, "null atom-name in nsAttrName");

    ReleaseInternalName();
    mBits = reinterpret_cast<PtrBits>(aAtom);
    NS_ADDREF(aAtom);
  }

  bool IsAtom() const
  {
    return !(mBits & NS_ATTRNAME_NODEINFO_BIT);
  }

  nsINodeInfo* NodeInfo() const
  {
    NS_ASSERTION(!IsAtom(), "getting nodeinfo-value of atom-name");
    return reinterpret_cast<nsINodeInfo*>(mBits & ~NS_ATTRNAME_NODEINFO_BIT);
  }

  nsIAtom* Atom() const
  {
    NS_ASSERTION(IsAtom(), "getting atom-value of nodeinfo-name");
    return reinterpret_cast<nsIAtom*>(mBits);
  }

  bool Equals(const nsAttrName& aOther) const
  {
    return mBits == aOther.mBits;
  }

  // Faster comparison in the case we know the namespace is null
  bool Equals(nsIAtom* aAtom) const
  {
    return reinterpret_cast<PtrBits>(aAtom) == mBits;
  }

  bool Equals(nsIAtom* aLocalName, int32_t aNamespaceID) const
  {
    if (aNamespaceID == kNameSpaceID_None) {
      return Equals(aLocalName);
    }
    return !IsAtom() && NodeInfo()->Equals(aLocalName, aNamespaceID);
  }

  bool Equals(nsINodeInfo* aNodeInfo) const
  {
    return Equals(aNodeInfo->NameAtom(), aNodeInfo->NamespaceID());
  }

  int32_t NamespaceID() const
  {
    return IsAtom() ? kNameSpaceID_None : NodeInfo()->NamespaceID();
  }

  int32_t NamespaceEquals(int32_t aNamespaceID) const
  {
    return aNamespaceID == kNameSpaceID_None ?
           IsAtom() :
           (!IsAtom() && NodeInfo()->NamespaceEquals(aNamespaceID));
  }

  nsIAtom* LocalName() const
  {
    return IsAtom() ? Atom() : NodeInfo()->NameAtom();
  }

  nsIAtom* GetPrefix() const
  {
    return IsAtom() ? nullptr : NodeInfo()->GetPrefixAtom();
  }

  bool QualifiedNameEquals(const nsAString& aName) const
  {
    return IsAtom() ? Atom()->Equals(aName) :
                      NodeInfo()->QualifiedNameEquals(aName);
  }

  void GetQualifiedName(nsAString& aStr) const
  {
    if (IsAtom()) {
      Atom()->ToString(aStr);
    }
    else {
      aStr = NodeInfo()->QualifiedName();
    }
  }

#ifdef MOZILLA_INTERNAL_API
  void GetPrefix(nsAString& aStr) const
  {
    if (IsAtom()) {
      SetDOMStringToNull(aStr);
    }
    else {
      NodeInfo()->GetPrefix(aStr);
    }
  }
#endif

  uint32_t HashValue() const
  {
    // mBits and uint32_t might have different size. This should silence
    // any warnings or compile-errors. This is what the implementation of
    // NS_PTR_TO_INT32 does to take care of the same problem.
    return mBits - 0;
  }

  bool IsSmaller(nsIAtom* aOther) const
  {
    return mBits < reinterpret_cast<PtrBits>(aOther);
  }

private:

  void AddRefInternalName()
  {
    // Since both nsINodeInfo and nsIAtom inherit nsISupports as its first
    // interface we can safely assume that it's first in the vtable
    nsISupports* name = reinterpret_cast<nsISupports *>
                                        (mBits & ~NS_ATTRNAME_NODEINFO_BIT);

    NS_ADDREF(name);
  }

  void ReleaseInternalName()
  {
    // Since both nsINodeInfo and nsIAtom inherit nsISupports as its first
    // interface we can safely assume that it's first in the vtable
    nsISupports* name = reinterpret_cast<nsISupports *>
                                        (mBits & ~NS_ATTRNAME_NODEINFO_BIT);

    NS_RELEASE(name);
  }

  PtrBits mBits;
};

#endif
