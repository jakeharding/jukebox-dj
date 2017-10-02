import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Song } from '../../models/Song';
import { SongRequest, SongRequestStatus } from '../../models/SongRequest';

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

  songs: Song[] = [];
  requests: SongRequest[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

}
