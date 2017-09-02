import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { io } from 'socket.io-client';

class RequestedSong {
  name:string;
  requestee:string;
  constructor(name:string, requestee:string) {
    this.name = name;
    this.requestee = requestee;
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // socket = io();
  requestee:string = "";
  name:string = "";
  playlist:RequestedSong[] = [];

  constructor(public navCtrl: NavController) {}

  requestSong () {
    // this.socket.emit('songRequest', )
    this.playlist.push(new RequestedSong(this.name, this.requestee));
    this.name = this.requestee = "";
  }

}
