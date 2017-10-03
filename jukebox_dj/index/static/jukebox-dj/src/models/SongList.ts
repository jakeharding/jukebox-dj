/**
 * SongList.ts - (C) Copyright - 10/2/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Song list model
 */
import {Song} from "./Song";


export interface SongList {
  uuid: string;
  artist: string;
  description: string;
  title: string;
  created_at: Date;
  songs: Song[];
}
