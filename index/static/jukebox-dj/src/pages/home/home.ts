import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { io } from 'socket.io-client';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // socket = io();
  name:string = "";
  song:string = "";
  playlist:string[] = [];

  constructor(public navCtrl: NavController) {}

  requestSong () {
    // this.socket.emit('songRequest', )
    console.log(this.name, this.song);
  }

}
