import { Component, EventEmitter, Output } from '@angular/core'
import { Keys } from 'numeric-keyboard'

const PasswordLayout = [
  [
    {
      key: Keys.ONE
    },
    {
      key: Keys.TWO
    },
    {
      key: Keys.THREE
    },
  ],
  [
    {
      key: Keys.FOUR
    },
    {
      key: Keys.FIVE
    },
    {
      key: Keys.SIX
    },
  ],
  [
    {
      key: Keys.SEVEN
    },
    {
      key: Keys.EIGHT
    },
    {
      key: Keys.NINE
    },
  ],
  [
    {
      key: Keys.BLANK
    },
    {
      key: Keys.ZERO
    },
    {
      key: Keys.DEL
    },
  ],
]

const PasswordTemplate = `
<section class="password">
  <div class="dialog">
    <h2>Conform password</h2>
    <div class="input">
      <span *ngFor="let n of [1, 2, 3, 4, 5, 6]" [ngClass]="{ 'fill': n <= password.length }"></span>
    </div>
    <numeric-keyboard class="numeric-keyboard" [layout]="PasswordLayout" (press)="press($event)"></numeric-keyboard>
  </div>
</section>
`

@Component({
  selector: 'password',
  template: PasswordTemplate,
  styleUrls: [ './app.component.styl' ]
})
export class Password {
  @Output() confirm = new EventEmitter<string>()

  public PasswordLayout: any = PasswordLayout
  public password: string = ''

  press(key) {
    if (key === Keys.DEL) {
      this.password = this.password.slice(0, -1)
    }
    else {
      this.password = this.password + key
      if (this.password.length === 6) {
        setTimeout(() => this.confirm.emit(this.password), 100)
      }
    }
  }
}

const AppTemplate = `
<main class="app">
  <header>
    <h1>Transfer to Arthur</h1>
  </header>
  <form (submit)="confirmAmount($event)">
    <label>Amount</label>
    <div class="input">
      <numeric-input class="numeric-input" type="number" autofocus entertext="Confirm" format="^(?:\\d+(?:\\.\\d{0,2})?)?$" [(ngModel)]="amount" (enterpress)="confirmAmount()"></numeric-input>
    </div>
    <input type="submit" value="Confirm" [disabled]="!amount" />
  </form>
  <footer>
    <p>Power by Numeric Keyboard</p>
  </footer>
  <password *ngIf="shouldOpenPassword" (confirm)="confirmPassword($event)"></password>
</main>
`

@Component({
  selector: '#app',
  template: AppTemplate,
  styleUrls: [ './app.component.styl' ]
})
export class App {
  public amount: string | number = ''
  public shouldOpenPassword: boolean = false

  confirmAmount(e) {
    if (e) {
      e.preventDefault()
    }
    if (this.amount) {
      this.shouldOpenPassword = true
    }
  }

  confirmPassword(password) {
    this.shouldOpenPassword = false
    setTimeout(() => alert(`Amount: ${this.amount}\nPassword: ${password}`), 200)
  }
  
}
