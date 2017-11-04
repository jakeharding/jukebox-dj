import { NgModule } from '@angular/core';
import { InfiniteScrollerDirective } from './infinite-scroller/infinite-scroller';
import { LoginRequiredDirective } from './login-required/login-required';

@NgModule({
	declarations: [
    InfiniteScrollerDirective,
    LoginRequiredDirective,
  ],
	imports: [],
	exports: [
    InfiniteScrollerDirective,
    LoginRequiredDirective,
  ]
})
export class DirectivesModule {}
