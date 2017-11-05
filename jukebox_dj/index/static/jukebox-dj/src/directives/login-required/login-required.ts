import {Directive, EventEmitter, Output} from '@angular/core';
import { Action, Store } from "@ngrx/store";
import { NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs/Observable";

import { AuthState } from "../../providers/auth/auth.store";
import {HAS_AUTH, GET_AUTH, AuthAction, LOGIN_FAIL} from "../../providers/auth/auth.actions";

/**
 * Generated class for the LoginRequiredDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: 'login-required',
  outputs: ['userEvent']
})
export class LoginRequiredDirective {

  user$: Observable<Action>;

  userEvent  = new EventEmitter();
  constructor(
    private store: Store<AuthState>,
    private navParams: NavParams,
    private navCtrl: NavController
  ) {
    this.user$ = this.store.select(state => state["auth"]);

    this.store.dispatch({type:GET_AUTH});

    this.user$.subscribe((action: AuthAction) => {

      console.log(action);

      if(action.type === LOGIN_FAIL) {
        this.navCtrl.setRoot('login');
      } else if (action.type === HAS_AUTH) {
        this.userEvent.emit(action.payload);
      }
    });

  }

}
