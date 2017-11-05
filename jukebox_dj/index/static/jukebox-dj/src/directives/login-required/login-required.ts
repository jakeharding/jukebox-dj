import { Directive } from '@angular/core';
import { Action, Store } from "@ngrx/store";
import { NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs/Observable";

import { AuthState } from "../../providers/auth/auth.store";
import { HAS_AUTH, GET_AUTH } from "../../providers/auth/auth.actions";

/**
 * Generated class for the LoginRequiredDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: 'login-required'
})
export class LoginRequiredDirective {

  user$: Observable<Action>;

  // @Output userEvent: EventEmitter  = new EventEmitter();
  constructor(
    private store: Store<AuthState>,
    private navParams: NavParams,
    private navCtrl: NavController
  ) {
    this.user$ = this.store.select(state => state["auth"]);

    if(!this.navParams.data.user) {
      this.store.dispatch({type:GET_AUTH});

      this.user$.subscribe((action) => {
        if(action.type !== HAS_AUTH) {
          this.navCtrl.setRoot('login');
        }
      });
    }

  }

}
