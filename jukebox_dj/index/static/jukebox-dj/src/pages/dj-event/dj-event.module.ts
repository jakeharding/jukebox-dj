import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DjEventPage } from './dj-event';
import {ComponentsModule} from "../../components/components.module";
import {DragulaModule} from "ng2-dragula/ng2-dragula";
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    DjEventPage
  ],
  imports: [
    IonicPageModule.forChild(DjEventPage),
    ComponentsModule,
    DragulaModule,
    DirectivesModule
  ],
})
export class DjEventPageModule {}
