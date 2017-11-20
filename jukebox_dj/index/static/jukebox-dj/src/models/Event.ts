/**
 * Event.ts - (C) Copyright - 10/2/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Brief description of the file.
 */
import {Song} from "./Song";
import {SongRequest} from "./SongRequest";
import {SongList} from "./SongList";

export interface Event {
  uuid: string;
  name: string;
  dj: string;
  created_at: Date;
  is_active: boolean;
  song_lists: SongList[];
  song_requests: SongRequest[];
  songs: Song [];

  constructor (name: string, dj: string, is_active: string) {
    this.name = name;
    this.dj = dj;
    this.is_active = is_active;
  }
}
