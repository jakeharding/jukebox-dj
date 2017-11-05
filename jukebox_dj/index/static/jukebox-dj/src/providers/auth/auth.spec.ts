/**
 * auth.spec.ts - (C) Copyright - 11/1/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Unit test auth provider.
 */

import { inject, TestBed} from '@angular/core/testing';
import { AuthProvider } from './auth';
import { HttpClientModule, HttpRequest, HttpXhrBackend, XhrFactory} from "@angular/common/http";
import { Http, HttpModule } from "@angular/http";
import { provideMockActions } from '@ngrx/effects/testing';
import { Storage } from '@ionic/storage';
import { AuthEffects } from "./auth.store";
import { UserProvider } from "../user/user";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';



describe("Auth effects", () => {
  let authProvider, userProvider;
  let authEffects: AuthEffects;
  let actions: Observable<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        AuthProvider,
        UserProvider,
        provideMockActions(() => actions),
        { provide: Storage, useClass: jasmine.createSpy("StorageMock", () => {}) }
      ],
      imports: [HttpModule, HttpClientModule]
    });
    authProvider = TestBed.get(AuthProvider);
    userProvider = TestBed.get(UserProvider);
    authEffects = TestBed.get(AuthEffects);
  });

  // TODO comeback and finish marble testing observables
  // describe("login$", () => {
  //   it("should call auth provider login", () => {
  //     spyOn(authProvider, "login").and.returnValue(Observable.throw("Bad Username"));
  //
  //     actions =      cold('a|', {a: { type: LOGIN }});
  //     let expected = cold('a', {a: new LoginFailedAction("Bad username")});
  //     expect(authEffects.login$).toBeObservable(expected);
  //     // expect(authProvider.login).toHaveBeenCalled();
  //   })
  // })
});

describe("Auth Provider", () => {
  let authProvider;
  beforeEach(() => {
    class storageMock {
      get(key:string): string {return "";}
    }

    TestBed.configureTestingModule({
      providers: [
        AuthProvider,
        { provide: Storage, useClass: storageMock }
      ],
      imports: [HttpModule]
    });
    authProvider = TestBed.get(AuthProvider);
  });

  describe("isLoggedIn", () => {
    it('should return false if the token is not there', () =>{
      console.log(authProvider.isLoggedIn())
      expect(authProvider.isLoggedIn()).toBe(false);

      spyOn(authProvider, "getToken").and.returnValue("A TOKEN");

      expect(authProvider.isLoggedIn()).toBe(true);
    });
  });

  describe('intercept', () => {
    it('should clone the request', () => {
      let mockReq = new HttpRequest<any>('POST, "A URL', "BODY", {});
      let mockHandler = new HttpXhrBackend({} as XhrFactory);

      spyOn(mockReq, 'clone').and.callThrough();
      spyOn(mockHandler, 'handle').and.callThrough();

      authProvider.intercept(mockReq, mockHandler);

      expect(mockReq.clone).toHaveBeenCalled();
      expect(mockHandler.handle).toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it("should call the webservice to login", () => {
      let client = TestBed.get(Http);
      spyOn(client, 'post');
      let mockCreds = {username: "Username", password: "password"};
      authProvider.login(mockCreds);

      expect(client.post).toHaveBeenCalledWith(authProvider.loginUrl, mockCreds);
    })
  })
});
