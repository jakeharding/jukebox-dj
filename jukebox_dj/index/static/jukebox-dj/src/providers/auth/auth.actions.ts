/**
 * auth.actions.ts - (C) Copyright - 11/4/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Authentication actions for ngrx store.
 */
import {Action} from "@ngrx/store";

export const GET_AUTH = '[Auth] Get';
export const HAS_AUTH = '[Auth] Has';
export const RECEIVE_TOKEN = '[Token] Receive';
export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login Fail';

// export class AuthAction implements Action {
//   readonly type;
//   payload: any;
//   user: User;
//   constructor(public payload: any) {}
// }

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
  constructor(public payload: any) {}
}

export class HasAuthAction implements Action {
  readonly type = HAS_AUTH;
  constructor(public payload: any) {}
}

export class LoginFailedAction implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export type AuthAction =
  GetAuthAction
  | LoginAction
  | ReceiveTokenAction
  | HasAuthAction
  | LoginFailedAction
