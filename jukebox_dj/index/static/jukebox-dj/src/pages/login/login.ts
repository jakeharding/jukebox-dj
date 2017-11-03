import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {Store} from "@ngrx/store";
import 'rxjs/add/operator/catch';

import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {User} from "../../models/User";
import {AuthProvider} from "../../providers/auth/auth";
import {AuthReducer, AuthState, LOGIN} from "../../providers/auth/auth.store";

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

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private authProvider: AuthProvider,
              private store: Store<AuthState>,
              private toastCtrl: ToastController
  ) {

    this.loginForm = this.formBuilder.group({
      username: new FormControl(this.username, [Validators.required, Validators.pattern(/[a-zA-Z0-9]{4}/)]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(4)])
    })
  }

  login () {
    this.store.dispatch({type:LOGIN});
    this.store.select(state=>state.user).subscribe(user => {
      if(!user) {
        let toast = this.toastCtrl.create({
          message: "Invalid username or password. Please try again.",
          position: "middle",
          cssClass: "error-toast",
          duration: 3000
        });
        toast.present();
      }
    })
  }
}
