import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventProvider } from "../../providers/event/event";
import { Event } from '../../models/Event';
import {User} from "../../models/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


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
  createEventForm: FormGroup;
  user: User;
  dj: string;
  event: Event = {};
  name:string = "";
  isActive: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private eventProvider: EventProvider, private formBuilder: FormBuilder) {
    this.createEventForm = this.formBuilder.group({
      name: new FormControl(this.name, [Validators.required]),
      is_active: new FormControl(this.isActive),
      dj: new FormControl(this.dj, Validators.required)
    })
  }

  ionViewDidLoad () {

  }

  userEvent (dj:User) {
    this.user = dj;
    this.createEventForm.controls['dj'].setValue(dj.dj_id);
  }

  createEvent() {
    // this.event.dj = this.user.dj_id;
    console.log(this.createEventForm);
    this.eventProvider.createEvent(this.createEventForm.value).subscribe(event => {
      this.navCtrl.push('manage-events');
    });
  }

}
