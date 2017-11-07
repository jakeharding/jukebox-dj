import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DjManageEventsPage } from './dj-manage-events';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    DjManageEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(DjManageEventsPage),
    ComponentsModule
  ],
})
export class DjManageEventsPageModule {}
