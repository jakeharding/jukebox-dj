import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from "../../providers/event/event";
import { Event } from '../../models/Event';
import { DatePipe } from '@angular/common';


/**
 * Generated class for the DjManageEventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
    name: 'manage-events',
    segment: 'manage-events/:dj_id'
})
@Component({
  selector: 'page-dj-manage-events',
  templateUrl: 'dj-manage-events.html',
})
export class DjManageEventsPage {
  event: Event;
  events: Event[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventProvider: EventProvider) {
      this.eventProvider.getEvents({dj__dj_id: this.navParams.data.dj_id}).subscribe(events => {
        this.events = events;
      });
  }
}
