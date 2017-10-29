import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
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

  getSongs(params:any): Observable<any> {
    let searchParams = new URLSearchParams();
    for (let param in params) {
      searchParams.set(param, params[param]);
    }

    let options = new RequestOptions({
      search: searchParams
    });

    return this.http.get(this.url, options).map(res => res.json());
  }
}
