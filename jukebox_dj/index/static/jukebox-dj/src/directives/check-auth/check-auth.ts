import {Directive, EventEmitter, Output} from '@angular/core';
import { Store } from "@ngrx/store";

import { AuthState } from "../../providers/auth/auth.store";
import { HAS_AUTH, GET_AUTH, AuthAction } from "../../providers/auth/auth.actions";


/**
 * Directive to check for if user is authenticated.
 * Use on pages where user's name should be displayed but authentication is required.
 */
@Directive({
  selector: 'check-auth',
})
export class CheckAuthDirective {


  @Output() userEvent = new EventEmitter();

  constructor(
    private store: Store<AuthState>,
  ) {
    this.store.select(state => state["auth"]).subscribe((action: AuthAction) => {
      let result;
      if (action.type === HAS_AUTH) {
        result = action.payload;
      }
      this.userEvent.emit(result);
    });

    this.store.dispatch({type:GET_AUTH});
  }

}
