import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NumericKeyboardModule } from 'numeric-keyboard';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NumericKeyboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
