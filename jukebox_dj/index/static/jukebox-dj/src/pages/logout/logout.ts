import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'logout',
  name: 'logout'
})
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, private authProvider: AuthProvider) {}

  ionViewDidLoad() {
    this.authProvider.clearToken();
    this.navCtrl.setRoot('home');
  }

}
