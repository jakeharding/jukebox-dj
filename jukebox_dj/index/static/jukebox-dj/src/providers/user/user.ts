import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AuthProvider} from "../auth/auth";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/empty";
import {User} from "../../models/User";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  private userUrl = "/api/dev/users";

  constructor(public http: HttpClient) {}

  get (): Observable<User> {
    return this.http.get(`${this.userUrl}/me`);
  }
}
