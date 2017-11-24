import {Directive, EventEmitter, Output} from '@angular/core';
import {UserProvider} from "../../providers/user/user";
import {AuthProvider} from "../../providers/auth/auth";


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
    private authProvider: AuthProvider,
    private userProvider: UserProvider
  ) {
    if (this.authProvider.isLoggedIn()) {
      this.userProvider.get().subscribe(user => {
        this.userEvent.emit(user)
      });
    }
  }

}
