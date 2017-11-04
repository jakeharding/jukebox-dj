import {Component} from '@angular/core';
import {IonicPage, NavParams, ToastController} from 'ionic-angular';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import 'rxjs/add/operator/map';

import { SongRequest } from '../../models/SongRequest';
import { SongRequestStatus } from '../../models/SongRequest';
import { SongRequestProvider } from "../../providers/song-request/song-request";
import { EventProvider } from '../../providers/event/event';
import { Event } from '../../models/Event';

import  { WebSocketBridge } from 'django-channels';


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
  event: Event;
  queuedRequests: SongRequest[] = [];
  deniedRequests: SongRequest[] = [];
  playedRequests: SongRequest[] = [];
  requestedRequests: SongRequest[] = [];

  eventBridge: WebSocketBridge;
  eventBridgeUri: string;

  requesterBridges: any = {}; // DJ will need to maintain a bridge for each requester


  constructor(
    public navParams: NavParams,
    private dragulaService: DragulaService,
    private reqProvider: SongRequestProvider,
    private eventProvider: EventProvider,
    private toast: ToastController,
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

      if (!this.requesterBridges[songRequest.cookie]) {
        let newBridge = new WebSocketBridge();
        newBridge.connect(`/events/${this.event.uuid}/requester/${songRequest.cookie}`);
        this.requesterBridges[songRequest.cookie] = newBridge;
      }
    });


    // TODO MUST - Hold the api version (dev in the url) in an environment specific way
    // TODO Stretch - Use the ngrx store to store the state of objects and handle requests
    this.eventProvider.getEvent(this.event.uuid)
      .subscribe(event => {
        this.event = event;
        for (let request of event.song_requests) {
          if(!this.requesterBridges[request.cookie]) {
            let newBridge = new WebSocketBridge();
            newBridge.connect(`${this.eventBridgeUri}/requester/${request.cookie}`);
            this.requesterBridges[request.cookie] = newBridge;
          }

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
    let status : SongRequestStatus = this.getRequestStatus(target.id);
    this.updateRequestStatus(el.id, status);
  }

  private updateRequestStatus(uuid:string, status:SongRequestStatus) {
    this.reqProvider.partialUpdate(uuid, status).subscribe((request: SongRequest) => {
      let bridge = this.requesterBridges[request.cookie];
      if (bridge) {
        bridge.send(request);
      }
    });
  }

  private getRequestStatus(requestString:string): SongRequestStatus {
    let status : SongRequestStatus;
    switch (requestString) {
      case "REQUESTED":
        status = SongRequestStatus.REQUESTED;
        break;
      case "DENIED":
        status = SongRequestStatus.DENIED;
        break;
      case "QUEUED":
        status = SongRequestStatus.QUEUED;
        break;
      default:
        status = SongRequestStatus.PLAYED;
    }
    return status;
  }

  // Called when an item is being moved via the slider buttons in mobile
  private updateItems(uuid:string, requestFrom:string, requestTo:string) {
    let item : SongRequest;
    switch (requestFrom) {
      case "REQUESTED":
        for (let i = 0; i < this.requestedRequests.length; i++)
        {
          if (this.requestedRequests[i].uuid == uuid) {
            item = this.requestedRequests[i];
            this.requestedRequests.splice(i, 1);
            break;
          }
        }
        break;
      case "DENIED":
        for (let i = 0; i < this.deniedRequests.length; i++)
        {
          if (this.deniedRequests[i].uuid == uuid) {
            item = this.deniedRequests[i];
            this.deniedRequests.splice(i, 1);
            break;
          }
        }
        break;
      case "QUEUED":
        for (let i = 0; i < this.queuedRequests.length; i++)
        {
          if (this.queuedRequests[i].uuid == uuid) {
            item = this.queuedRequests[i];
            this.queuedRequests.splice(i, 1);
            break;
          }
        }
        break;
    }

    let itemTo : SongRequestStatus;
    switch (requestTo) {
      case "REQUESTED":
        itemTo = SongRequestStatus.REQUESTED;
        this.requestedRequests.push(item);
        break;
      case "DENIED":
        itemTo = SongRequestStatus.DENIED;
        this.deniedRequests.push(item);
        break;
      case "QUEUED":
        itemTo = SongRequestStatus.QUEUED;
        this.queuedRequests.push(item);
        break;
      default:
        itemTo = SongRequestStatus.PLAYED;
        this.playedRequests.push(item);
    }
    this.updateRequestStatus(uuid, itemTo);
  }
}
