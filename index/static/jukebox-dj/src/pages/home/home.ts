import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import  * as io from 'socket.io-client';

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
  socket: WebSocket;
  // socket = io.connect("/event",{transports: ['websocket']});
  requestee:string = "";
  name:string = "";
  playlist:RequestedSong[] = [];

  constructor(public navCtrl: NavController) {
    this.socket = new WebSocket("ws://localhost:8000/event/");
    this.socket.onmessage = (eve) => {
      console.log(eve);
    }
    this.socket.onopen = () => {
      this.socket.send("Hello World");
    }
    this.socket.onmessage = (eve) => {
      this.playlist.push(eve.data);
      console.log(eve);
    }
    this.socket.onclose = (eve) => {
      console.log(eve);
    }
    // if (this.socket.readyState === WebSocket.OPEN) {this.socket.onopen();}
    // this.socket.on('event', (song) => {
    //   console.log(song);
    //   // this.playlist.push(new RequestedSong())
    // })
    // this.socket.on('message', (song) => {
    //   console.log(song);
    //   // this.playlist.push(new RequestedSong())
    // })
    // this.socket.on('disconnect', (song) => {
    //   console.log(song);
    //   // this.playlist.push(new RequestedSong())
    // })
    // this.socket.on('connect', (song) => {
    //   console.log(this.socket.id);
    //   // this.playlist.push(new RequestedSong())
    // })
  }

  requestSong () {
    // this.socket.emit('event',new RequestedSong(this.name, this.requestee));
    this.socket.send(new RequestedSong(this.name, this.requestee));
    // this.playlist.push(new RequestedSong(this.name, this.requestee));
    this.name = this.requestee = "";
  }

}
