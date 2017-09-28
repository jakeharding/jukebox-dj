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

    // This provides a shortcut to the dj's event page
    this.event = {
      name: "Emily's Wedding",
      uuid: "282121e2-bd4a-4b43-b070-f376413f1082"
    }
  }

  // requestSong () {
  //   this.bridge.send(new RequestedSong(this.name, this.requestee));
  //   this.name = this.requestee = "";
  // }

}
