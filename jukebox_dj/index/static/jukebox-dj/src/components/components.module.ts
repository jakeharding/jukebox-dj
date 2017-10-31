import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { JukeboxHeaderComponent } from './jukebox-header/jukebox-header';
import { InfiniteScrollerComponent } from './infinite-scroller/infinite-scroller';

@NgModule({
	declarations: [JukeboxHeaderComponent,
    InfiniteScrollerComponent],
	imports: [IonicModule, CommonModule],
	exports: [JukeboxHeaderComponent,
    InfiniteScrollerComponent]
})
export class ComponentsModule {}
