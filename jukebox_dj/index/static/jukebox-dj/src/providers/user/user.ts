import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AuthProvider} from "../auth/auth";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/empty";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  private userUrl = "/api/dev/user";

  constructor(public http: HttpClient, private authProvider: AuthProvider) {}

  get () {
    if (!this.authProvider.isLoggedIn()) { return Observable.empty() }

    return this.http.get(`${this.userUrl}/me`)
  }
}
