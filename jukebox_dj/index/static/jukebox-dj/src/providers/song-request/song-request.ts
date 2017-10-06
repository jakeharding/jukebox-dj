import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SongRequest} from "../../models/SongRequest";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the SongRequestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SongRequestProvider {

  constructor(public http: Http) {}

  create(request: SongRequest): Observable<SongRequest>{
    return this.http.post('/api/dev/song-requests', request).map(res => res.json())
  }
}
