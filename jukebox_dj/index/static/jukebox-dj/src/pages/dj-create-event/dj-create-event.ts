import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from "../../providers/event/event";
import { Event } from '../../models/Event';

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
  active: boolean = false;

  eventName: string = '';
  eventNameCorrect: boolean = true;

  event: Event;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  verifyInput(eventName: string) {
    if (eventName == '') {
      this.eventNameCorrect = false;
      return;
    }
    this.eventNameCorrect = true;
  }

  createEvent(event: Event) {

  }

}
