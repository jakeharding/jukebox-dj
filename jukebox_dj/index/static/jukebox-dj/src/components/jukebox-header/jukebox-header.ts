import { Component } from '@angular/core';
import {User} from "../../models/User";

/**
 * Generated class for the JukeboxHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'jukebox-header',
  templateUrl: 'jukebox-header.html'
})
export class JukeboxHeaderComponent {

  user: User = null;

  constructor() {
    // TODO This is a rough model of what the user will look like. Formally define when we add login
    // TODO Use an ngRx store to manage this state
    // this.user = {
      // first_name: "Default",
      // last_name: "DJ",
      // username: "someDj@AwesomeSauce",
      // email: "someDj@AwesomeSauce",
      // djprofile: {
      //   display_name: "DJ Awesome Sauce",
      //   dj_id: "1234"
      // }
    // }
  }

}
