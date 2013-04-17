/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Make sure each of the plural forms have the correct number of forms and
 * match up in functionality.
 */

Components.utils.import("resource://gre/modules/PluralForm.jsm");

function run_test()
{
  let allExpect = [[
    // 0: Chinese 0-9, 10-19, ..., 90-99
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    // 100-109, 110-119, ..., 190-199
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    // 200-209, 210-219, ..., 290-299
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
  ], [
    // 1: English 0-9, 10-19, ..., 90-99
    2,1,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    // 100-109, 110-119, ..., 190-199
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    // 200-209, 210-219, ..., 290-299
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
  ], [
    // 2: French 0-9, 10-19, ..., 90-99
    1,1,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    // 100-109, 110-119, ..., 190-199
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    // 200-209, 210-219, ..., 290-299
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
  ], [
    // 3: Latvian 0-9, 10-19, ..., 90-99
    1,2,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    // 100-109, 110-119, ..., 190-199
    3,2,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    // 200-209, 210-219, ..., 290-299
    3,2,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
    3,2,3,3,3,3,3,3,3,3,
  ], [
    // 4: Scottish Gaelic 0-9, 10-19, ..., 90-99
    4,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    // 100-109, 110-119, ..., 190-199
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    // 200-209, 210-219, ..., 290-299
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
  ], [
    // 5: Romanian 0-9, 10-19, ..., 90-99
    2,1,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    // 100-109, 110-119, ..., 190-199
    3,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    // 200-209, 210-219, ..., 290-299
    3,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
  ], [
    // 6: Lithuanian 0-9, 10-19, ..., 90-99
    2,1,3,3,3,3,3,3,3,3,
    2,2,2,2,2,2,2,2,2,2,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    // 100-109, 110-119, ..., 190-199
    2,1,3,3,3,3,3,3,3,3,
    2,2,2,2,2,2,2,2,2,2,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    // 200-209, 210-219, ..., 290-299
    2,1,3,3,3,3,3,3,3,3,
    2,2,2,2,2,2,2,2,2,2,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
    2,1,3,3,3,3,3,3,3,3,
  ], [
    // 7: Russian 0-9, 10-19, ..., 90-99
    3,1,2,2,2,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    // 100-109, 110-119, ..., 190-199
    3,1,2,2,2,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    // 200-209, 210-219, ..., 290-299
    3,1,2,2,2,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
    3,1,2,2,2,3,3,3,3,3,
  ], [
    // 8: Slovak 0-9, 10-19, ..., 90-99
    3,1,2,2,2,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    // 100-109, 110-119, ..., 190-199
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    // 200-209, 210-219, ..., 290-299
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
  ], [
    // 9: Polish 0-9, 10-19, ..., 90-99
    3,1,2,2,2,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    // 100-109, 110-119, ..., 190-199
    3,3,2,2,2,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    // 200-209, 210-219, ..., 290-299
    3,3,2,2,2,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
    3,3,2,2,2,3,3,3,3,3,
  ], [
    // 10: Slovenian 0-9, 10-19, ..., 90-99
    4,1,2,3,3,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    // 100-109, 110-119, ..., 190-199
    4,1,2,3,3,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    // 200-209, 210-219, ..., 290-299
    4,1,2,3,3,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
  ], [
    // 11: Irish Gaeilge 0-9, 10-19, ..., 90-99
    5,1,2,3,3,3,3,4,4,4,
    4,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    // 100-109, 110-119, ..., 190-199
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    // 200-209, 210-219, ..., 290-299
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,5,5,
  ], [
    // 12: Arabic 0-9, 10-19, ..., 90-99
    6,1,2,3,3,3,3,3,3,3,
    3,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    // 100-109, 110-119, ..., 190-199
    5,5,5,3,3,3,3,3,3,3,
    3,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    // 200-209, 210-219, ..., 290-299
    5,5,5,3,3,3,3,3,3,3,
    3,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
  ], [
    // 13: Maltese 0-9, 10-19, ..., 90-99
    2,1,2,2,2,2,2,2,2,2,
    2,3,3,3,3,3,3,3,3,3,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    // 100-109, 110-119, ..., 190-199
    4,2,2,2,2,2,2,2,2,2,
    2,3,3,3,3,3,3,3,3,3,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    // 200-209, 210-219, ..., 290-299
    4,2,2,2,2,2,2,2,2,2,
    2,3,3,3,3,3,3,3,3,3,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
    4,4,4,4,4,4,4,4,4,4,
  ], [
    // 14: Macedonian 0-9, 10-19, ..., 90-99
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    // 100-109, 110-119, ..., 190-199
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    // 200-209, 210-219, ..., 290-299
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
    3,1,2,3,3,3,3,3,3,3,
  ], [
    // 15: Icelandic 0-9, 10-19, ..., 90-99
    2,1,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    // 100-109, 110-119, ..., 190-199
    2,1,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    // 200-209, 210-219, ..., 290-299
    2,1,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
    2,1,2,2,2,2,2,2,2,2,
  ], [
    // 16: Breton 0-9, 10-19, ..., 90-99
    5,1,2,3,3,5,5,5,5,3,
    5,5,5,5,5,5,5,5,5,5,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,5,5,5,5,5,5,5,5,5,
    5,1,2,3,3,5,5,5,5,3,
    5,5,5,5,5,5,5,5,5,5,
    // 100-109, 110-119, ..., 190-199
    5,1,2,3,3,5,5,5,5,3,
    5,5,5,5,5,5,5,5,5,5,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,5,5,5,5,5,5,5,5,5,
    5,1,2,3,3,5,5,5,5,3,
    5,5,5,5,5,5,5,5,5,5,
    // 200-209, 210-219, ..., 290-299
    5,1,2,3,3,5,5,5,5,3,
    5,5,5,5,5,5,5,5,5,5,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,1,2,3,3,5,5,5,5,3,
    5,5,5,5,5,5,5,5,5,5,
    5,1,2,3,3,5,5,5,5,3,
    5,5,5,5,5,5,5,5,5,5,
  ]];

  for (let [rule, expect] in Iterator(allExpect)) {
    print("\nTesting rule #" + rule);

    let [get, numForms] = PluralForm.makeGetter(rule);

    // Make sure the largest value expected matches the number of plural forms
    let maxExpect = Math.max.apply(this, expect);
    do_check_eq(maxExpect, numForms());

    // Make a string of numbers, e.g., 1;2;3;4;5
    let words = [];
    for (let i = 1; i <= maxExpect; i++)
      words.push(i);
    words = words.join(";");

    // Make sure we get the expected number
    for (let [index, number] in Iterator(expect)) {
      print(["Plural form of ", index, " should be ", number, " (", words, ")"].join(""));
      do_check_eq(get(index, words), number);
    }
  }
}
