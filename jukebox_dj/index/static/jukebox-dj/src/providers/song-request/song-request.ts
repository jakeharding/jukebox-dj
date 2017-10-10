import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SongRequest, SongRequestStatus} from "../../models/SongRequest";
import {Observable} from "rxjs/Observable";

import { RequestOptions, Headers } from '@angular/http';

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

  update(request: SongRequest): Observable<SongRequest>{
    return this.http.put('/api/dev/song-requests/' + request.uuid, request).map(res => res.json())
  }

  partialUpdate(uuid:string, status:SongRequestStatus): Observable<SongRequest>{
    return this.http.patch(`/api/dev/song-requests/${uuid}`, {status}).map(res => res.json())
  }
}
