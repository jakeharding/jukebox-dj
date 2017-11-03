/**
 * auth.store.ts - (C) Copyright - 11/1/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Auth reducer.
 */

import { Action } from '@ngrx/store';
import {User} from "../../models/User";
import {Injectable} from "@angular/core";
import {AuthProvider} from "./auth";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import {AuthToken} from "../../models/Token";
import { Storage } from '@ionic/storage';
import {UserProvider} from "../user/user";

export interface AuthState {
  user: User;
}

export const InitialAuthState: AuthState = {
  user: null
};

export const GET_AUTH = '[Auth] Get';
export const RECEIVE_AUTH = '[Auth] Receive';
export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login Fail';


export class GetAuthAction implements Action {
  readonly type = GET_AUTH;
  constructor(public payload: User) {}
}

export class ReceiveAuthAction implements Action {
  readonly type = RECEIVE_AUTH;
  constructor(public payload: AuthToken) {}
}

export class LoginFailedAction implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export function AuthReducer (state = InitialAuthState, action: Action) {
  let user = "action.payload";
  // let user = action.payload;
  if (action.type == GET_AUTH) {
    user = null;
  }
  return user;
}

@Injectable()
export class AuthEffects {
  constructor(
    private authProvider: AuthProvider,
    private actions$: Actions,
    private store: Storage,
    private userProvider: UserProvider
  ) {}

  @Effect () login$: Observable<Action> = this.actions$.ofType(LOGIN)
    .map((action: GetAuthAction) => action.payload)
    .exhaustMap(auth =>
      this.authProvider.login(auth)
        .map(loginResp => new ReceiveAuthAction(loginResp))
        .map((receiveAuth) => {
          this.store.set("dj_token", receiveAuth.payload.token);
          // this.userProvider.get()
        })
        .catch(err => of(new LoginFailedAction(err)))
    )
}
