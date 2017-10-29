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

import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';

import { LoginPage } from './login';

describe('LoginPage', () => {
  let loginPageComp: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [

        IonicModule.forRoot(LoginPage)

      ],
      providers: [
        StatusBar,
        SplashScreen,
        NavController
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    loginPageComp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('ion-title'));
    el = de.nativeElement;
  });

  it ('should be created', () => {
    expect(loginPageComp instanceof LoginPage).toBe(true);
  });

  it('should say login in the title', () => {
    expect(el.textContent).toBe('login');
  })
});
