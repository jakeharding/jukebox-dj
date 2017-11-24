import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Song } from '../../models/Song';
import { SongProvider, LIMIT } from "../../providers/song/song";
import { EventProvider } from "../../providers/event/event";
import { Event } from '../../models/Event';
import { SongRequest, SongRequestStatus } from "../../models/SongRequest";
import { SongRequestProvider } from "../../providers/song-request/song-request";
import { Observable } from "rxjs/Rx";
import { WebSocketBridge } from 'django-channels';


/**
 * Generated class for the RequesterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: 'requester',
  segment: 'requester-events/:uuid'
})
@Component({
  selector: 'page-requester',
  templateUrl: 'requester.html',
})

export class RequesterPage {
  event: Event;
  requesterLists: string = "songs";
  songs: Array<Song> = [];
  requested: SongRequest[] = [];
  searchText: string;

  eventBridge: WebSocketBridge;
  eventBridgeUri: string;

  requesterBridge: WebSocketBridge;
  requesterBridgeUri: string;
  requesterCookie: string;

  //Variables for pagination
  offset: number;
  scrollCallback;
  loadMore: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private songProvider: SongProvider, private reqProvider: SongRequestProvider,
    private eventProvider: EventProvider, private toast: ToastController) {

    this.eventBridgeUri = `/events/${this.navParams.data.uuid}`;
    this.offset = 0;
    this.loadMore = true;

    // TODO Index page may get the event and pass event data to this page. Add condition when index page is ready.
    this.eventProvider.getEvent(navParams.data.uuid).subscribe(event => {
      this.event = event;
    });

    this.scrollCallback = this.getEventSongs.bind(this);
  }

  filterSongs() {
    if (this.searchText.length >= 2 || this.searchText.length === 0) {
      this.songProvider.getSongs({ search: this.searchText, event: this.event.uuid }).subscribe( (songs) =>{
        this.songs = songs;
      });
    }
  }

  clearFilteredSongs () {
    this.offset = 0;
    this.loadMore = true;
    this.searchText = null;
    this.getEventSongs().subscribe((songs => {this.songs = songs}));
  }

  getEventSongs() {
    if (this.loadMore) {
      let queryParams = {
        event: this.navParams.data.uuid,
        limit: LIMIT,
        offset: this.offset
      };

      if (this.searchText) {
        queryParams['search'] = this.searchText;
      }
      return this.songProvider.getSongs(queryParams).do(this.processData);
    }
    return Observable.empty();
  }

  private processData = (songs) => {
    if (songs.length == 0) {
      this.loadMore = false;
      return;
    }
    this.offset += LIMIT;
    this.songs = this.songs.concat(songs);
  };

  removeSong(uuid: string) {
    this.songs = this.songs.filter((underTest: Song) => {
      return uuid !== underTest.uuid;
    });
  }

  ionViewWillLeave () {
    this.eventBridge.socket.close();
    this.requesterBridge.socket.close();
  }

  ionViewWillLoad() {
    this.requesterCookie = document.cookie.split(/;\s*/).find((value) => {
      return value.indexOf('song_request') >= 0;
    }).split("=")[1];

    this.reqProvider.list({ cookie__uuid: this.requesterCookie, event__uuid: this.navParams.data.uuid })
      .subscribe((songRequests: SongRequest[]) => {
        this.requested = songRequests;
      });

    this.requesterBridgeUri = `${this.eventBridgeUri}/requester/${this.requesterCookie}`;
    this.createRequesterBridge();
  }

  ionViewWillEnter () {
    this.eventBridge = new WebSocketBridge();
    this.eventBridge.connect(this.eventBridgeUri);
    this.eventBridge.listen((songRequest: SongRequest) => {
      // Listen on this bridge to remove songs from songs available for request.
      this.removeSong(songRequest.song.uuid);
    });
  }

  createRequesterBridge() {
    this.requesterBridge = new WebSocketBridge();
    this.requesterBridge.connect(this.requesterBridgeUri);

    this.requesterBridge.listen((songRequest: SongRequest) => {
      let toastClass, toastMsg;

      switch (songRequest.status) {
        case SongRequestStatus.DENIED:
          toastClass = "error-toast";
          toastMsg = `Sorry, your request for ${songRequest.song_title} has been denied.`;
          break;
        case SongRequestStatus.QUEUED:
          toastClass = "success-toast";
          toastMsg = `Your song has been queued! ${songRequest.song_title} will be played soon.`;
          break;
        case SongRequestStatus.PLAYED:
          toastClass = 'played-request-toast';
          toastMsg = `Your song, ${songRequest.song_title} has been played!`;
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

  createRequest(song: Song) {
    let req = new SongRequest(song.uuid, this.event.uuid, this.requesterCookie);
    this.reqProvider.create(req).subscribe((request: SongRequest) => {

      request.song = song;
      this.removeSong(song.uuid);

      //Success on http request. Update dj and other requesters and open channel with session key.
      // This will also update this requester's list
      this.eventBridge.send(request);

      // Add to list of requester's requests
      this.requested.push(request);

      // Show a success message
      const toast = this.toast.create({
        message: "Your request has been sent!",
        duration: 3000,
        position: 'top',
        cssClass: 'success-toast'
      });
      toast.present();
    }, error => {
      // Error on http request. Most likely a network connection problem
      let msg = "Unable to request a song at this time. Please check your network and try again.";
      if (error.status === 409) {
        msg = error.error.message;
      }
      const toast = this.toast.create({
        message: msg,
        duration: 3000,
        position: "top",
        cssClass: "error-toast"
      });
      toast.present();
    });
  }
}
