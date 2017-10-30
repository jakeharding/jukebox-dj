import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {User} from "../../models/User";

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
  private user: User;
  public usernameErr = "Username invalid";

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.user = new User("", "");
    this.loginForm = this.formBuilder.group({
      username: new FormControl(this.user.username, [Validators.required, Validators.pattern(/[a-zA-Z0-9]{4}/)]),
      password: [this.user.password, Validators.required]
    })
  }

  login () {
    console.log(this.loginForm, this.user);
  }
}
