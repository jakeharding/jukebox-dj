/**
 * user.provider.spec.ts - (C) Copyright - 11/2/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Test the UserProvider.
 */

import { TestBed } from '@angular/core/testing';
import { UserProvider } from "./user";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {AuthProvider} from "../auth/auth";
import { HttpModule } from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/empty";

fdescribe("User Provider", () => {
  let userProvider: UserProvider;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProvider, AuthProvider],
      imports: [HttpClientModule, HttpModule]
    });
    userProvider = TestBed.get(UserProvider);
  });

  describe("Get user", () => {
    it("should get the logged in user when no params are submitted", () => {
      let http = TestBed.get(HttpClient);
      let authProvider = TestBed.get(AuthProvider);
      spyOn(authProvider, "isLoggedIn").and.returnValue(true);
      spyOn(http, "get");
      userProvider.get();
      expect(http.get).toHaveBeenCalledWith(jasmine.stringMatching(/api\/\w+\/user\/me/));
    });

    it("should return an empty observable if not logged in", () => {
      let authProvider = TestBed.get(AuthProvider);
      spyOn(authProvider, "isLoggedIn").and.returnValue(false);
      expect(userProvider.get()).toEqual(Observable.empty())
    })
  });
});
