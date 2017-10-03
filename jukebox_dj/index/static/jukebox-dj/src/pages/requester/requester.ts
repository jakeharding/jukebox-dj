import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Song } from '../../models/Song';
// import { SongRequest, SongRequestStatus } from '../../models/SongRequest';
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
  requests: string = "songs";
  songs: Song[] = [];
  filteredSongs: Song[] = [];
  // requests: SongRequest[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams, private eventProvider: EventProvider) {

    // this call won't be needed after index page is built
    // Index page will make call to filter dj's events for an active event and pass event data to this page
    this.eventProvider.getEvent(navParams.data.uuid).subscribe( data => {
      this.event = data;
      // this.songs = this.event.songs;
      // this.requests = this.event.song_requests;
      for (let list of this.event.song_lists) {
        for(let song of list.songs) {
          this.songs.push(song);
        }
      }
      this.filteredSongs = this.songs;
    });
  }

  filterSongs (event: any) {
    let val = event.target.value;

    if (val) {
      this.filteredSongs = this.filteredSongs.filter((song:Song) => {
        return song.title.toLowerCase().includes(val.toLowerCase()) || song.artist.toLowerCase().includes(val.toLowerCase());
      })
    } else if (!val || val.length === 0) {
      this.filteredSongs = this.songs;
    }
  }

}
