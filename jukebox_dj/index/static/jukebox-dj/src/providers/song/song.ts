import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Song } from '../../models/Song';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the SongProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SongProvider {
  url:string = '/api/dev/songs';
  constructor(public http: Http) {}

  getEventSongs(uuid:string, limit:number, offset:number): Observable<any> {
    return this.http.get(`${this.url}?event=${uuid}&limit=${limit}&offset=${offset}`).map(res => res.json());
  }

}
