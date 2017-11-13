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
  djId: string;
  event: Event;
  events: Event[] = [];


  constructor(public navCtrl: NavController, private eventProvider: EventProvider) {

  }

  navigate(){
    this.eventProvider.getEvents({dj_id:this.djId,is_active:true}).subscribe(events => {
      if(events.length === 1){
        this.navCtrl.push("requester",events[0])
      }
      //  this.events = events;
    })
    console.log(this.djId);
    //this.navCtrl.push(Event);
  }
}
