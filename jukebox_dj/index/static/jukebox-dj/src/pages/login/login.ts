import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {User} from "../../models/User";
import {AuthProvider} from "../../providers/auth/auth";

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
              private authProvider: AuthProvider) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(this.username, [Validators.required, Validators.pattern(/[a-zA-Z0-9]{4}/)]),
      password: [this.password, Validators.required]
    })
  }

  login () {
    // this.authProvider.login();

  }
}
