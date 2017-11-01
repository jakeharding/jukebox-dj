import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Event } from '../../models/Event';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventProvider {
  url:string = '/api/dev/events';
  constructor(public http: HttpClient) {}

  getEvent(uuid:string): Observable<Event> {
    return this.http.get(`${this.url}/${uuid}`);
  }

  createEvent(event: Event): Observable<Event>  {
    return this.http.post(this.url, event);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get(this.url);
  }
}
