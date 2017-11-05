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

import { Store } from '@ngrx/store';
import {User} from "../../models/User";
import {Injectable} from "@angular/core";
import {AuthProvider} from "./auth";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { of } from 'rxjs/observable/of';

import {UserProvider} from "../user/user";
import * as AuthActions from './auth.actions';

export type AuthAction = AuthActions.AuthAction;


export interface AuthState {
  user: User;
}

export const InitialAuthState: AuthState = {
  user: null
};

export function AuthReducer (state = InitialAuthState, action: AuthAction) {
  return Object.assign({}, state, action);
}

@Injectable()
export class AuthEffects {
  constructor(
    private authProvider: AuthProvider,
    private actions$: Actions,
    private userProvider: UserProvider,
    private store: Store<AuthState>
  ) {}

  @Effect () login$: Observable<AuthAction> = this.actions$.ofType(AuthActions.LOGIN)
    .switchMap(({ payload }: AuthAction) =>
      this.authProvider.login(payload)
        .map(loginResp => new AuthActions.ReceiveTokenAction(loginResp.json()))
        .map((receiveAuth) => {
          this.authProvider.setToken(receiveAuth.payload.token);
          this.store.dispatch({type: AuthActions.GET_AUTH});
          return receiveAuth;
        }).catch(err => of(new AuthActions.LoginFailedAction(err.json())))
    );

  @Effect () getUser$: Observable<AuthAction> = this.actions$.ofType(AuthActions.GET_AUTH)
    .switchMap((action: AuthAction) =>
      this.userProvider.get()
        .map(user => new AuthActions.HasAuthAction(user))
        .map(hasAuth => {
          return hasAuth;
        }).catch(error => of(new AuthActions.LoginFailedAction(error.status)))
    );
}
