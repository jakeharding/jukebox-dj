import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {AuthToken} from "../../models/Token";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider implements HttpInterceptor {
  loginUrl = "/api/dev/login";

  constructor(public http: Http) {}

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${this.getToken()}`
      }
    });
    return next.handle(request);
  }

  getToken(): AuthToken {
    return {token: ''};
  }

  login (creds: any): Observable<any> {
    //TODO Login to REST api
    return this.http.post(this.loginUrl, creds);
  }

  isLoggedIn() {
    return !(this.getToken().token === "");
  }

}
