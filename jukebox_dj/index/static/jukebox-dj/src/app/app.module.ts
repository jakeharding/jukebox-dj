import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {DragulaModule} from "ng2-dragula/ng2-dragula"

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {DjEventPage} from "../pages/dj-event/dj-event";
import {JukeboxHeaderComponent} from "../components/jukebox-header/jukebox-header";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DjEventPage,
    JukeboxHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    DragulaModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DjEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
