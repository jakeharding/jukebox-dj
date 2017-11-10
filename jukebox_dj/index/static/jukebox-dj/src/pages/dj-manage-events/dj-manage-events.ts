import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from "../../providers/event/event";
import { Event } from '../../models/Event';
import {User} from "../../models/User";


/**
 * Generated class for the DjManageEventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
    name: 'manage-events',
    segment: 'manage-events'
})
@Component({
  selector: 'page-dj-manage-events',
  templateUrl: 'dj-manage-events.html',
})
export class DjManageEventsPage {
  event: Event;
  events: Event[] = [];
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventProvider: EventProvider) {

  }

  userEvent (dj:User) {
    this.user = dj;
    this.eventProvider.getEvents({dj_id: dj.dj_id}).subscribe(events => {
      this.events = events;
    });
  }
}
