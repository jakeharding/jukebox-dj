import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequesterPage } from './requester';
import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from "../../directives/directives.module"

@NgModule({
  declarations: [
    RequesterPage
  ],
  imports: [
    IonicPageModule.forChild(RequesterPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class RequesterPageModule {}
