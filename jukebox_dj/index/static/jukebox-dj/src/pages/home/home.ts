import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Event } from '../../models/Event';
import { EventProvider} from "../../providers/event/event";

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  event: Event;
  events: Event[] = [];


  constructor(public navCtrl: NavController, private eventProvider: EventProvider) {
    eventProvider.getEvents({}).subscribe(events => {
      this.events = events;
    })
  }
}
