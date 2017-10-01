import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DjEventPage } from './dj-event';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    DjEventPage
  ],
  imports: [
    IonicPageModule.forChild(DjEventPage),
    ComponentsModule
  ],
})
export class DjEventPageModule {}
