import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Event } from '../../models/Event';
import { EventProvider} from "../../providers/event/event";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  noEventFound: boolean = false;
  searchForEventForm: FormGroup;
  djId: string = null;
  // event: Event;
  events: Event[] = [];

  constructor(public navCtrl: NavController,
              private eventProvider: EventProvider,
              private formBuilder: FormBuilder) {
    this.noEventFound = false;
    this.searchForEventForm = this.formBuilder.group({
      dj__dj_id: new FormControl(this.djId, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
      is_active: true
    })
  }

  goToEvent (e:Event) {
    this.navCtrl.push('requester', e).then(() => { this.events = []})
  }

  navigate(){
    this.eventProvider.getEvents(this.searchForEventForm.value).subscribe(events => {
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
