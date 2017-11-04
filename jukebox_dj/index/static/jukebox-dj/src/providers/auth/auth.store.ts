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

import {Action, Store} from '@ngrx/store';
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

export const TOKEN_STO_KEY = "djToken";

export interface AuthState {
  user: User;
}

export const InitialAuthState: AuthState = {
  user: null
};

export const GET_AUTH = '[Auth] Get';
export const HAS_AUTH = '[Auth] Has';
export const RECEIVE_TOKEN = '[Token] Receive';
export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login Fail';


export class GetAuthAction implements Action {
  readonly type = GET_AUTH;
  constructor(public payload: any) {}
}

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor(public payload: any) {}
}

export class ReceiveTokenAction implements Action {
  readonly type = RECEIVE_TOKEN;
  constructor(public payload: AuthToken) {}
}

export class HasAuthAction implements Action {
  readonly type = HAS_AUTH;
  constructor(public payload: User) {}
}

export class LoginFailedAction implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export function AuthReducer (state = InitialAuthState, action: Action) {
  switch (action.type) {
    case LOGIN_FAIL:
      state.user = null;
      break;
    case GET_AUTH:
    case RECEIVE_TOKEN:
    case HAS_AUTH:
    default:
      state = Object.assign({}, state, action);
      break;
  }
  return state;
}

@Injectable()
export class AuthEffects {
  constructor(
    private authProvider: AuthProvider,
    private actions$: Actions,
    private storage: Storage,
    private userProvider: UserProvider,
    private store: Store<AuthState>
  ) {}

  @Effect () login$: Observable<Action> = this.actions$.ofType(LOGIN)
    .exhaustMap(({ payload }: LoginAction) =>
      this.authProvider.login(payload)
        .map(loginResp => new ReceiveTokenAction(loginResp))
        .map((receiveAuth) => {
          this.storage.set(TOKEN_STO_KEY, receiveAuth.payload.token);
          this.store.dispatch({type: GET_AUTH});
          return new GetAuthAction(this.authProvider.getToken());
        })
        .catch(err => of(new LoginFailedAction(err)))
    );

  @Effect () getUser$: Observable<Action> = this.actions$.ofType(GET_AUTH)
    .map((action) => {
      if (this.authProvider.isLoggedIn()) {
        return new ReceiveTokenAction(this.authProvider.getToken());
      } else {
        return new LoginFailedAction("Not logged in");
      }
    })
    .exhaustMap(action => {
      if (action instanceof ReceiveTokenAction) {
        this.userProvider.get()
          .map(user => new HasAuthAction(user))
          .catch(error => Observable.throw(new LoginFailedAction(error)));
      } else {
        return of(action);
      }
    })

}
