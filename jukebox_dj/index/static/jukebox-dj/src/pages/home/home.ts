import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Event } from '../../models/Event';
import { EventProvider} from "../../providers/event/event";
import {User} from "../../models/User";

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User;
  event: Event;
  events: Event[] = [];


  constructor(private eventProvider: EventProvider) {
    eventProvider.getEvents().subscribe(events => {
      this.events = events;
    })
  }

  userEvent (user: User) {
    this.user = user;
  }
}
