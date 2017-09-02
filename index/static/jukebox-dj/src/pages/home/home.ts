import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  { WebSocketBridge } from 'django-channels';

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
  bridge: WebSocketBridge;
  // socket: WebSocket;
  // socket = io.connect("/event",{transports: ['websocket']});
  requestee:string = "";
  name:string = "";
  playlist:RequestedSong[] = [];

  constructor(public navCtrl: NavController) {
    this.bridge = new WebSocketBridge();
    this.bridge.connect('/event/');
    this.bridge.listen((action, stream) => {
      this.playlist.push(action);
    });
  }

  requestSong () {
    this.bridge.send(new RequestedSong(this.name, this.requestee));
    this.name = this.requestee = "";
  }

}
