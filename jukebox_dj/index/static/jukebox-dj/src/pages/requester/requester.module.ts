import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequesterPage } from './requester';
import { ComponentsModule } from "../../components/components.module";

import { InfiniteScrollerDirective } from './infinite-scroller.directive';

@NgModule({
  declarations: [
    RequesterPage,
    InfiniteScrollerDirective
  ],
  imports: [
    IonicPageModule.forChild(RequesterPage),
    ComponentsModule
  ],
})
export class RequesterPageModule {}
