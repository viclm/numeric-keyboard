import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.styl' ]
})
export class AppComponent {
  public keyboardOutput: string
  public val: string | number

  get inputOutput() {
    return `${typeof this.val}: ${this.val}`
  }

  press(key) {
    this.keyboardOutput = `${typeof key}: ${key}`
  }
}
