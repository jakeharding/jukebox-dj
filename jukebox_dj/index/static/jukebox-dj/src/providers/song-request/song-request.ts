import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {SongRequest, SongRequestStatus} from "../../models/SongRequest";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the SongRequestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SongRequestProvider {

  uri: string = '/api/dev/song-requests';

  constructor(public http: HttpClient) {}

  create(request: SongRequest): Observable<SongRequest>{
    return this.http.post('/api/dev/song-requests', request);
  }

  update(request: SongRequest): Observable<SongRequest>{
    return this.http.put('/api/dev/song-requests/' + request.uuid, request);
  }

  partialUpdate(uuid:string, status:SongRequestStatus): Observable<SongRequest>{
    return this.http.patch(`/api/dev/song-requests/${uuid}`, {status});
  }

  list(params:any) {
    return this.http.get(this.uri, {params});
  }
}
