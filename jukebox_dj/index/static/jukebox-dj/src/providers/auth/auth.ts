import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {Http} from "@angular/http";

import { Storage } from "@ionic/storage";

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

import {AuthToken} from "../../models/Token";
// import {TOKEN_STO_KEY} from "./auth.store";

export const TOKEN_STO_KEY = "djToken";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider implements HttpInterceptor {
  loginUrl = "/api/dev/login";
  token: string;

  constructor(public http: Http,
              private storage: Storage
              ) {}

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${this.getToken()}`
      }
    });
    return next.handle(request);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_STO_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_STO_KEY, token);
  }

  login (creds: any): Observable<any> {
    return this.http.post(this.loginUrl, creds);
  }

  isLoggedIn() {
    return  !!this.getToken();
  }

}
