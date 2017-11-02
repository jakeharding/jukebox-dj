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

import { TestBed } from '@angular/core/testing';
import { AuthProvider } from './auth';
import {HttpClientModule, HttpRequest, HttpXhrBackend, XhrFactory} from "@angular/common/http";

describe("Auth Provider", () => {
  let authProvider;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthProvider],
      imports: [HttpClientModule]
    });
  });

  beforeEach( () => {
    authProvider = TestBed.get(AuthProvider);
  });

  describe("isLoggedIn", () => {
    it('should return false if the token is not there', () =>{
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
});
