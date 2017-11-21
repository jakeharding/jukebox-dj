import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventProvider } from "../../providers/event/event";
import { Event } from '../../models/Event';
import {User} from "../../models/User";


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

  user: User;
  event: Event = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private eventProvider: EventProvider) {}

  userEvent (dj:User) {
    this.user = dj;
  }

  createEvent() {
    this.event.dj = this.user.dj_id;
    this.eventProvider.createEvent(this.event).subscribe(event => {
      this.navCtrl.push('manage-events');
    });
  }

}
