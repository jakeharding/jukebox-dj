import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Event } from '../../models/Event';
import {Observable} from "rxjs/Observable";
import {BaseProvider} from "../BaseProvider";

/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventProvider extends BaseProvider {
  url:string = '/api/dev/events';
  constructor(public http: HttpClient) { super(); }

  getEvent(uuid:string): Observable<Event> {
    return this.http.get(`${this.url}/${uuid}`);
  }

  createEvent(event: Event): Observable<Event>  {
    return this.http.post(this.url, event);
  }

  getEvents(paramsObj:any): Observable<Event[]> {
    let params: HttpParams;
    params = this.buildQueryParams(paramsObj);
    return this.http.get(this.url, { params });
  }
}
