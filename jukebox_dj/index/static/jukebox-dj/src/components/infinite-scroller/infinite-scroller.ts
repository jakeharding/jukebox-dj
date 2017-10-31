import { Component } from '@angular/core';

/**
 * Generated class for the InfiniteScrollerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'infinite-scroller',
  templateUrl: 'infinite-scroller.html'
})
export class InfiniteScrollerComponent {

  text: string;

  constructor() {
    console.log('Hello InfiniteScrollerComponent Component');
    this.text = 'Hello World';
  }

}
