import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Store} from "@ngrx/store";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AuthState, AuthAction} from "../../providers/auth/auth.store";
import { LOGIN, LOGIN_FAIL, RECEIVE_TOKEN } from '../../providers/auth/auth.actions';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: 'login',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginForm: FormGroup;
  private username: string = "";
  private password: string = "";
  public usernameErr = "Please provide a valid username.";

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private nav: NavController
  ) {

    this.loginForm = this.formBuilder.group({
      username: new FormControl(this.username, [Validators.required, Validators.pattern(/[a-zA-Z0-9]/)]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(4)])
    });

    this.store.select(state=>state['auth']).subscribe(( action: AuthAction ) => {
      if(action.type === LOGIN_FAIL ) {
        let toast = this.toastCtrl.create({
          message: action.payload.non_field_errors, //Django default response when bad creds are submitted
          position: "middle",
          cssClass: "error-toast",
          duration: 3000
        });
        toast.present();
      } else if (action.type === RECEIVE_TOKEN) {
        if (this.navParams.data.next) {
          this.nav.setRoot(this.navParams.data.next);
        } else {
          this.nav.setRoot('manage-events');
        }
      }
    })

  }

  login () {
    this.store.dispatch({type:LOGIN, payload: this.loginForm.value});

    this.store.select(state=>state['auth']).subscribe(( user ) => {/* Noop to  trigger obeservable */})
  }
}
