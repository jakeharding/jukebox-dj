/**
  Song.ts - (C) Copyright - 2017
  This software is copyrighted to contributors listed in CONTRIBUTIONS.md.

  SPDX-License-Identifier: SEE LICENSE.txt

  Author(s) of this file:
    J.Harding

  Model Song data.
 */


export interface Song {
  uuid:string;
  title:string;
  artist:string;
  description:string;
  created_at:Date;
  dj:string;
}
