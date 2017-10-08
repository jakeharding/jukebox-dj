import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { DragulaService } from 'ng2-dragula/components/dragula.provider'
import 'rxjs/add/operator/map';

/**
 * Generated class for the DjEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

enum RequestStatus {
  REQUESTED, QUEUED, DENIED, PLAYED
}

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private dragulaService: DragulaService
  ) {

    this.event = navParams.data;

    // Quick and dirty http request. Plenty of TODOs
    // TODO MUST - Hold the api version (dev in the url) in an environment specific way
    // TODO MUST - Hold the url string in a symbolic constant
    // TODO MUST - Model events and song requests into classes to remove the any
    // TODO Stretch - Use the ngrx store to store the state of objects and handle requests
    this.http.get(`/api/dev/events/${this.event.uuid}`)
      .map(res => res.json())
      .subscribe(data => {
        this.event = data;
        for (let request of data.song_requests) {
          switch (request.status) {
            case RequestStatus.DENIED:
              this.deniedRequests.push(request);
              break;
            case RequestStatus.QUEUED:
              this.queuedRequests.push(request);
              break;
            case RequestStatus.PLAYED:
              this.playedRequests.push(request);
              break;
            default:
              this.requestedRequests.push(request);
              break;
          }
        }
      })

      dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
      });
  }

  ionViewDidLoad() {
    console.log(this.event);
  }

  private onDrop(args) {
    let [e, el] = args;
    console.log("Queued Songs")
    for (let x of this.queuedRequests) {
      console.log(x.song.title)
    }
    console.log("Requested Songs")
    for (let x of this.requestedRequests) {
      console.log(x.song.title);
    }
    console.log("Denied Songs")
    for (let x of this.deniedRequests) {
      console.log(x.song.title)
    }
  }
}
