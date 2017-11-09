import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DjCreateEventPage } from './dj-create-event';
import {ComponentsModule} from "../../components/components.module";
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    DjCreateEventPage,
  ],
  imports: [
    IonicPageModule.forChild(DjCreateEventPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class DjCreateEventPageModule {}
