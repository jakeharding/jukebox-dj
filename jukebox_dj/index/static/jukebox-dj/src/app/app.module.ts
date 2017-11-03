import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DragulaModule } from "ng2-dragula/ng2-dragula";

import { MyApp } from './app.component';
import { EventProvider } from '../providers/event/event';
import { SongRequestProvider } from "../providers/song-request/song-request";
import { SongProvider } from "../providers/song/song"
import {SongRequestProvider} from "../providers/song-request/song-request";
import { AuthProvider } from '../providers/auth/auth';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthEffects, AuthReducer } from "../providers/auth/auth.store";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot({auth: AuthReducer}),
    EffectsModule.forRoot([AuthEffects]),
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthProvider, multi: true},
    EventProvider,
    SongRequestProvider,
    SongProvider,
    AuthProvider
  ]
})
export class AppModule {}
