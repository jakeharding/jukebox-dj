/**
 * login.spec.ts - (C) Copyright - 10/28/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Test the login controller.
 *
 */

import {async, TestBed, ComponentFixture, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {IonicModule, NavParams, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';

import { LoginPage } from './login';
import { AuthProvider } from "../../providers/auth/auth";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import {AuthReducer, AuthState} from "../../providers/auth/auth.store";
import {Store, StoreModule} from "@ngrx/store";
import "rxjs/add/observable/of";
import {Observable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";


describe('LoginPage', () => {
  let loginPageComp: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let de: DebugElement;
  let titleEle: HTMLElement;
  let pwInput: HTMLElement;
  let pwLabel: HTMLElement;
  let usernameInput: HTMLElement;
  let usernameLabel: HTMLElement;
  let loginForm: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage),
        StoreModule.forRoot({auth: AuthReducer}),
        HttpClientModule,
        HttpModule
      ],
      providers: [
        StatusBar,
        SplashScreen,
        NavController,
        AuthProvider,
        { provide: Storage, useClass: jasmine.createSpy("StorageMock", () => {}) }
        { provide: NavParams, useClass: jasmine.createSpy("NavParams", () => {}) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    loginPageComp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    titleEle = de.nativeElement;

    de = fixture.debugElement.query(By.css("ion-input[tid=username-input]"));
    usernameInput = de.nativeElement;
    de = fixture.debugElement.query(By.css("ion-label[tid=username-label]"));
    usernameLabel = de.nativeElement;

    de = fixture.debugElement.query(By.css("ion-input[tid=password-input]"));
    pwInput = de.nativeElement;
    de = fixture.debugElement.query(By.css("ion-label[tid=password-label]"));
    pwLabel = de.nativeElement;

    de = fixture.debugElement.query(By.css("form[tid=login-form]"));
    loginForm = de.nativeElement;
  });

  it ('should be created', () => {
    expect(loginPageComp instanceof LoginPage).toBe(true);
  });

  it('should say Jukebox DJ in the title', () => {
    expect(titleEle.textContent).toBe('Jukebox DJ');
  });

  it('should have username, password inputs, and form', () => {
    expect(usernameInput).not.toBeUndefined();
    expect(usernameLabel.textContent).toBe('Username or Email');
    expect(pwInput).not.toBeUndefined();
    expect(pwLabel.textContent).toBe('Password');
    expect(loginForm).not.toBeUndefined();
  });

  it('should call the authProvider login method', inject([Store], (store: Store<AuthState>) => {
    let authProvider = TestBed.get(AuthProvider);
    // let toast = TestBed.get(ToastController);
    // spyOn(toast, 'create').and.returnValue({present: () => {}});
    // let store = TestBed.get(Store);

    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.returnValue(Observable.of({}));
    // spyOn(authProvider, 'login');
    loginPageComp.login();

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.select).toHaveBeenCalled();

  }))
});
