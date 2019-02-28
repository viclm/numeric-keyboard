import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NumericKeyboardModule } from 'numeric-keyboard';

import { App, Password } from './app.component';


@NgModule({
  declarations: [
    App,
    Password
  ],
  imports: [
    BrowserModule,
    NumericKeyboardModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule {}
