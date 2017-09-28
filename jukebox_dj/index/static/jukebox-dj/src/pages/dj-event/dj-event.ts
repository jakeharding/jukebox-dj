import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the DjEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name:'events',
  segment: 'events/:uuid'
})
@Component({
  selector: 'page-dj-event',
  templateUrl: 'dj-event.html',
})
export class DjEventPage {
  event: any; //TODO Model event into a class and remove any
  requests: any[]; // TODO Model songs and song requests and remove any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http
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
        this.requests = data.song_requests;
      })
  }

  ionViewDidLoad() {
  }

}
