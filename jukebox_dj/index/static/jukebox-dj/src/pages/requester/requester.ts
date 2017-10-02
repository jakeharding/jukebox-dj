import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Song } from '../../models/Song';
import { SongRequest, SongRequestStatus } from '../../models/SongRequest';
import { EventProvider} from "../../providers/event/event";
import { Event } from '../../models/Event';

/**
 * Generated class for the RequesterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: 'requester',
  segment: 'requester-event/:uuid'
})
@Component({
  selector: 'page-requester',
  templateUrl: 'requester.html',
})
export class RequesterPage {

  event: Event;
  // songs: Song[] = [];
  // requests: SongRequest[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams, private eventProvider: EventProvider) {
    // this call won't be needed after index page is built
    // Index page will make call to filter dj's events for an active event and pass event data to this page
    this.eventProvider.getEvent(navParams.data.uuid).subscribe( data => {
      this.event = data;
      // this.songs = this.event.songs;
      // this.requests = this.event.song_requests;
    });
  }

}
