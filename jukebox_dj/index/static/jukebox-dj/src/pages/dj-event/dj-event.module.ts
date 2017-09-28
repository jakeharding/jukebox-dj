import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DjEventPage } from './dj-event';

@NgModule({
  declarations: [
    DjEventPage,
  ],
  imports: [
    IonicPageModule.forChild(DjEventPage),
  ],
})
export class DjEventPageModule {}
