import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequesterPage } from './requester';

@NgModule({
  declarations: [
    RequesterPage,
  ],
  imports: [
    IonicPageModule.forChild(RequesterPage),
  ],
})
export class RequesterPageModule {}
