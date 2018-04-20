import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.styl' ]
})
export class AppComponent {
  public keyboardOutput: string

  press(key) {
    this.keyboardOutput = `${typeof key}: ${key}`
  }
}
