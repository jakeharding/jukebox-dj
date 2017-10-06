/**
 * SongRequest.ts - (C) Copyright - 10/2/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Model Song requests.
 */


export enum SongRequestStatus {
  REQUESTED, QUEUED, DENIED, PLAYED
}

export class SongRequest {
  uuid: string;
  song: string;
  requester_name: string;
  message: string;
  created_at: Date;
  status: SongRequestStatus;
  event: string;

  constructor (song: string, event: string, requester_name?: string, message?:string) {
    this.song = song;
    this.event = event;
    this.requester_name = requester_name;
    this.message = message;
  }
}
