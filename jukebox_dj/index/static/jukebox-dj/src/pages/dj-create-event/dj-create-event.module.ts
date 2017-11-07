import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DjCreateEventPage } from './dj-create-event';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    DjCreateEventPage,
  ],
  imports: [
    IonicPageModule.forChild(DjCreateEventPage),
    ComponentsModule
  ],
})
export class DjCreateEventPageModule {}
