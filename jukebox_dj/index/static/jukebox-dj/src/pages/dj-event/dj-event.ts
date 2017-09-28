import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";

/**
 * Generated class for the DjEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name:'events',
  segment: 'events/:uuid'
})
@Component({
  selector: 'page-dj-event',
  templateUrl: 'dj-event.html',
})
export class DjEventPage {
  home = HomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DjEventPage');
  }

}
