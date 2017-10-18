import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DragulaService } from 'ng2-dragula/components/dragula.provider'
import 'rxjs/add/operator/map';

import {SongRequest} from '../../models/SongRequest';
import {SongRequestStatus} from '../../models/SongRequest';
import {SongRequestProvider} from "../../providers/song-request/song-request"

import  { WebSocketBridge } from 'django-channels';
import {Song} from "../../models/Song";

/**
 * Generated class for the DjEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: 'events',
  segment: 'events/:uuid'
})
@Component({
  selector: 'page-dj-event',
  templateUrl: 'dj-event.html',
})
export class DjEventPage {
  event: any; //TODO Model event into a class and remove any
  queuedRequests: any[] = []; // TODO Model songs and song requests and remove any
  deniedRequests: any[] = []; // TODO Model songs and song requests and remove any
  playedRequests: any[] = []; // TODO Model songs and song requests and remove any
  requestedRequests: any[] = []; // TODO Model songs and song requests and remove any

  eventBridge: WebSocketBridge;
  eventBridgeUri: string;

  requesterBridges: any = {}; // DJ will need to maintain a bridge for each requester


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private dragulaService: DragulaService,
    private reqProvider: SongRequestProvider,
    private toast: ToastController
  ) {
    this.event = navParams.data;
    this.eventBridgeUri = `/events/${this.event.uuid}`;

    this.eventBridge = new WebSocketBridge();
    this.eventBridge.connect(this.eventBridgeUri);

    this.eventBridge.listen((songRequest: SongRequest) => {
      this.requestedRequests.push(songRequest);
      const toast = this.toast.create({
        message: `Request for ${ songRequest.song.title } has been received!`,
        duration: 3000,
        position: 'top',
        cssClass: 'new-request-toast'
      });
      toast.present();

      if (!this.requesterBridges[songRequest.session]) {
        let newBridge = new WebSocketBridge();
        newBridge.connect(`/events/${this.event.uuid}/requester/${songRequest.session}`);
        this.requesterBridges[songRequest.session] = newBridge;
      }
    });


    // Quick and dirty http request. Plenty of TODOs
    // TODO MUST - Hold the api version (dev in the url) in an environment specific way
    // TODO MUST - Hold the url string in a symbolic constant
    // TODO MUST - Model events and song requests into classes to remove the any
    // TODO Stretch - Use the ngrx store to store the state of objects and handle requests
    this.http.get(`/api/dev/events/${this.event.uuid }`)
      .map(res => res.json())
      .subscribe(data => {
        this.event = data;
        for (let request of data.song_requests) {
          switch (request.status) {
            case SongRequestStatus.DENIED:
              this.deniedRequests.push(request);
              break;
            case SongRequestStatus.QUEUED:
              this.queuedRequests.push(request);
              break;
            case SongRequestStatus.PLAYED:
              this.playedRequests.push(request);
              break;
            default:
              this.requestedRequests.push(request);
              break;
          }
        }
      });

    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
  }

  private onDrop(args) {
    let [el, target, source, sibling] = args;
    let status : SongRequestStatus;
    switch (target.id) {
      case "requested":
        status = SongRequestStatus.REQUESTED;
        break;
      case "denied":
        status = SongRequestStatus.DENIED;
        break;
      case "queued":
        status = SongRequestStatus.QUEUED;
        break;
    }
    this.updateRequestStatus(el.id, status);
  }

  private updateRequestStatus(uuid:string, status:SongRequestStatus) {
    this.reqProvider.partialUpdate(uuid, status).subscribe((request: SongRequest) => {
      //TODO: If update successful tell websocket channel and notify requester
      let bridge = this.requesterBridges[request.session];
      bridge.send(request);
    });
  }
}
