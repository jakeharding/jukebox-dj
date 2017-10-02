import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import  { WebSocketBridge } from 'django-channels';
import { DjEventPage} from "../dj-event/dj-event";


// class RequestedSong {
//   name:string;
//   requestee:string;
//   constructor(name:string, requestee:string) {
//     this.name = name;
//     this.requestee = requestee;
//   }
// }

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushPage = DjEventPage;
  // bridge: WebSocketBridge;
  // requestee:string = "";
  // name:string = "";
  // playlist:RequestedSong[] = [];
  event: any;


  constructor(public navCtrl: NavController) {
    // this.bridge = new WebSocketBridge();
    // this.bridge.connect('/event/');
    // this.bridge.listen((action, stream) => {
    //   this.playlist.push(action);
    // });

    // This provides a shortcut to the dj's event page so we don't have to show a list of events
    this.event = {
      name: "Emily's Wedding",
      uuid: "19dcfbdf-b6b9-4ffa-a91e-03f1c7faf7de"
    }
  }

  // requestSong () {
  //   this.bridge.send(new RequestedSong(this.name, this.requestee));
  //   this.name = this.requestee = "";
  // }

}
