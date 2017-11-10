import { NgModule } from '@angular/core';
import { InfiniteScrollerDirective } from './infinite-scroller/infinite-scroller';
import { LoginRequiredDirective } from './login-required/login-required';
import { CheckAuthDirective } from './check-auth/check-auth';

@NgModule({
  declarations: [
    InfiniteScrollerDirective,
    LoginRequiredDirective,
    CheckAuthDirective,
  ],
  imports: [],
  exports: [
    InfiniteScrollerDirective,
    LoginRequiredDirective,
    CheckAuthDirective,
  ]
})
export class DirectivesModule {}
