import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DjCreateEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
    name: 'create-event',
    segment: 'create-event'
})
@Component({
  selector: 'page-dj-create-event',
  templateUrl: 'dj-create-event.html',
})
export class DjCreateEventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DjCreateEventPage');
  }

}
