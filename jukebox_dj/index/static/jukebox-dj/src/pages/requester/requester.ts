import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Song } from '../../models/Song';
import { EventProvider} from "../../providers/event/event";
import { Event } from '../../models/Event';
import {SongRequest, SongRequestStatus} from "../../models/SongRequest";
import {SongRequestProvider} from "../../providers/song-request/song-request";

import  { WebSocketBridge } from 'django-channels';


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
  requesterLists: string = "songs";
  songs: Song[] = [];
  filteredSongs: Song[] = [];
  requested: SongRequest[] = [];

  eventBridge: WebSocketBridge;
  eventBridgeUri: string;

  requesterBridge: WebSocketBridge;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private eventProvider: EventProvider, private reqProvider: SongRequestProvider,
              private toast: ToastController) {

    this.eventBridgeUri = `/events/${this.navParams.data.uuid}`;

    // TODO Index page may get the event and pass event data to this page. Add condition when index page is ready.
    this.eventProvider.getEvent(navParams.data.uuid).subscribe( data => {
      this.event = data;

      // TODO Paginate this in the backend. This pulls in all songs and song lists for the event.
      for (let list of this.event.song_lists) {
        this.songs = this.songs.concat(list.songs);
      }

      // TODO Filter songs via network request query. This only filters the list in the browser.
      this.filteredSongs = this.songs;
      this.eventBridge = new WebSocketBridge();
      this.eventBridge.connect(this.eventBridgeUri);
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

  createRequest(song: Song) {
    let req = new SongRequest(song.uuid, this.event.uuid);
    this.reqProvider.create(req).subscribe((request: SongRequest) => {
      //Success on http request. Update dj and open channel with session key.
      request.song = song;
      this.eventBridge.send(request);
      this.requested.push(request);
      const toast = this.toast.create({
        message: "Your request has been sent!",
        duration: 3000,
        position: 'top',
        cssClass: 'success-toast'
      });
      toast.present();

      if (!this.requesterBridge) {
        this.requesterBridge = new WebSocketBridge();
        this.requesterBridge.connect(`${this.eventBridgeUri}/requester/${request.session}`);

        this.requesterBridge.listen((songRequest: SongRequest) => {
          let toastClass, toastMsg;

          switch (songRequest.status) {
            case SongRequestStatus.DENIED:
              toastClass = "error-toast";
              toastMsg = `Sorry, your request for ${songRequest.song.title} has been denied.`;
              break;
            case SongRequestStatus.QUEUED:
              toastClass = "success-toast";
              toastMsg = `Your song has been queued! ${songRequest.song.title} will be played soon.`;
              break;
            case SongRequestStatus.PLAYED:
              toastClass = 'played-request-toast';
              toastMsg = `Your song, ${songRequest.song.title} has been played!`;
              break;
            default:
              toastClass = '';
              toastMsg = '';
              break;
          }

          const toast = this.toast.create({
            message: toastMsg,
            duration: 3000,
            position: 'top',
            cssClass: toastClass
          });
          toast.present();
        });
      }

    }, error => {
      // Error on http request. Most likely a network connection problem
      const toast = this.toast.create({
        message: "Unable to request a song at this time. Please check your network and try again.",
        duration: 3000,
        position: "top",
        cssClass: "error-toast"
      });
      toast.present();
    });
  }

}
