import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    return this.http.post(this.uri, request);
  }

  update(request: SongRequest): Observable<SongRequest>{
    return this.http.put(`${this.uri}/${request.uuid}`, request);
  }

  partialUpdate(uuid:string, status:SongRequestStatus): Observable<SongRequest>{
    return this.http.patch(`${this.uri}/${uuid}`, {status});
  }

  list(paramsObj:any) {
    // HttpClient only accepts HttpParams. Github says This is fixed in Angular 5.
    let params = new HttpParams();
    Object.keys(paramsObj).forEach((k) => {
      params = params.append(k, paramsObj[k]);
    });

    return this.http.get(this.uri, {params});
  }
}
