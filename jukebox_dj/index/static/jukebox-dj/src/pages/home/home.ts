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
  noEventFound: boolean = false;
  djId: string;
  event: Event;
  events: Event[] = [];


  constructor(public navCtrl: NavController, private eventProvider: EventProvider) {
    this.noEventFound = false;
  }
  navigate(){
    this.eventProvider.getEvents({dj__dj_id:this.djId,is_active:true}).subscribe(events => {
      this.noEventFound = false;
      if(events.length === 1) {
        this.navCtrl.push("requester", events[0])
      } else if (events.length > 1){
        this.events = events;
      } else {
        this.noEventFound = true;
        this.events = [];
      }
    });
  }
}
