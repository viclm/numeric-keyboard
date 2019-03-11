import { NumericKeyboard, NumericInput, Keys } from 'numeric-keyboard'
import '../styles.styl'

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
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="keyboard"></div>
  </div>
</section>
`

class Password {
  constructor(el, options) {
    this.el = el
    this.options = options
    this.password = ''

    this.render()
  }

  press(key) {
    if (key === Keys.DEL) {
      this.password = this.password.slice(0, -1)
    }
    else {
      this.password = this.password + key
    }

    Array.prototype.slice.call(this.el.querySelectorAll('.input span')).forEach((el, n) => {
      if (n < this.password.length) {
        el.setAttribute('class', 'fill')
      }
      else {
        el.removeAttribute('class')
      }
    })

    if (this.password.length === 6) {
      setTimeout(() => this.options.onConfirm.call(null, this.password), 100)
    }
  }

  render() {
    this.el.outerHTML = PasswordTemplate
    this.el = document.querySelector('.password')

    new NumericKeyboard({
      layout: PasswordLayout,
      onPress: this.press.bind(this)
    }).mount('.keyboard')
  }
}

const AppTemplate = `
<main class="app">
  <header>
    <h1>Transfer to Arthur</h1>
  </header>
  <form>
    <label>Amount</label>
    <div class="input"><div></div></div>
    <input type="submit" value="Confirm" disabled />
  </form>
  <footer>
    <p>Power by Numeric Keyboard</p>
  </footer>
</main>
`

export default class App {
  constructor(el, options) {
    this.el = el
    this.options = options
    this.amount = ''

    this.render()
  }

  inputAmount(amount) {
    this.amount = amount
    this.el.querySelector('input[type=submit]').disabled = !amount
  }

  confirmAmount(e) {
    if (e) {
      e.preventDefault()
    }
    if (this.amount) {
      const elPassword = document.createElement('div')
      this.el.appendChild(elPassword)
      new Password(elPassword, { onConfirm: this.confirmPassword.bind(this) })
    }
  }

  confirmPassword(password) {
    this.el.removeChild(this.el.querySelector('.password'))
    setTimeout(() => alert(`Amount: ${this.amount}\nPassword: ${password}`), 200)
  }

  render() {
    this.el.outerHTML = AppTemplate
    this.el = document.querySelector('.app')

    new NumericInput({
      type: 'number',
      autofocus: true,
      entertext: 'Confirm',
      format: '^(?:\\d+(?:\\.\\d{0,2})?)?$',
      onInput: this.inputAmount.bind(this),
      onEnterpress: this.confirmAmount.bind(this)
    }).mount('.input div')

    this.el.querySelector('form').addEventListener('submit', this.confirmAmount.bind(this), false)
  }
}
