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
import { AuthProvider } from "../auth/auth";
import { HttpModule } from "@angular/http";
import "rxjs/add/observable/empty";
import { Storage } from "@ionic/storage";


describe("User Provider", () => {
  let userProvider: UserProvider;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserProvider,
        AuthProvider,
       { provide: Storage, useClass: jasmine.createSpy("StorageMock", () => {}) }
      ],
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
      expect(http.get).toHaveBeenCalledWith(jasmine.stringMatching(/api\/\w+\/djs\/me/));
    });
  });
});
