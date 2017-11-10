/**
 * User.ts - (C) Copyright - 10/28/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Model user. Focuses on the DJ.
 */

export class User {
  bio:string;
  display_name: string;
  dj_id: string;

  constructor (username:string, password: string, displayName?: string) {}
}
