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

export interface Event {
  uuid: string;
  name: string;
  dj: string;
  created_at: Date;
  is_active: boolean;
  songs: Song[];
  song_requests: SongRequest[];
}
