import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { JukeboxHeaderComponent } from './jukebox-header/jukebox-header';

@NgModule({
	declarations: [
	  JukeboxHeaderComponent
  ],
	imports: [IonicModule, CommonModule],
	exports: [
	  JukeboxHeaderComponent
  ]
})
export class ComponentsModule {}
