/**
 * User.ts - (C) Copyright - 10/28/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Brief description of the file.
 */

export class User {
  public username: string;
  public password: string;
  public displayName: string;

  constructor (username:string, password: string, displayName?: string) {
    this.username = username;
    this.password = password;
    this.displayName = displayName;
  }
}
