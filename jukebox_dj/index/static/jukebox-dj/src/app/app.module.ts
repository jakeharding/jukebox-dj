import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {DragulaModule} from "ng2-dragula/ng2-dragula"

import { MyApp } from './app.component';
import { EventProvider } from '../providers/event/event';
import {SongRequestProvider} from "../providers/song-request/song-request";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    DragulaModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: XSRFStrategy, useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')},
    EventProvider,
    SongRequestProvider
  ]
})
export class AppModule {}
