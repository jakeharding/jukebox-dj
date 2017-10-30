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

  getLimit(): number {
    return 2;
  }

  getSongs(params:any): Observable<Song[]> {

    return this.http.get(this.url, {params})
    .map(res => res.json())
    .map(({results}) => results);
  }
}
