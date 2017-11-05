import {Component, Input} from '@angular/core';
import {User} from "../../models/User";
import {NavController} from "ionic-angular";

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

  @Input user: User;

  constructor(
    private nav: NavController
  ) {}

  goToLogin () {
    this.nav.push('login');
  }

}
