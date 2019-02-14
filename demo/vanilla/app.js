import './app.styl'
import { NumericKeyboard, NumericInput, keys } from 'numeric-keyboard'

const PasswordLayout = [
  [
    {
      key: keys.ONE
    },
    {
      key: keys.TWO
    },
    {
      key: keys.THREE
    },
  ],
  [
    {
      key: keys.FOUR
    },
    {
      key: keys.FIVE
    },
    {
      key: keys.SIX
    },
  ],
  [
    {
      key: keys.SEVEN
    },
    {
      key: keys.EIGHT
    },
    {
      key: keys.NINE
    },
  ],
  [
    {
      key: keys.BLANK
    },
    {
      key: keys.ZERO
    },
    {
      key: keys.DEL
    },
  ],
]

const TMPL_APP = `
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

const TMPL_PASSWORD = `
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
    if (key === keys.DEL) {
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
    this.el.outerHTML = TMPL_PASSWORD
    this.el = document.querySelector('.password')

    new NumericKeyboard('.keyboard', {
      layout: PasswordLayout,
      onPress: this.press.bind(this)
    })
  }
}

class App {
  constructor(el, options) {
    this.el = el
    this.options = options
    this.amount = null

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
    this.el.outerHTML = TMPL_APP
    this.el = document.querySelector('.app')

    new NumericInput('.input div', {
      type: 'number',
      entertext: 'Confirm',
      format: '^(?:\\d+(?:\\.\\d{0,2})?)?$',
      onInput: this.inputAmount.bind(this),
      onEnterpress: this.confirmAmount.bind(this)
    })

    this.el.querySelector('form').addEventListener('submit', this.confirmAmount.bind(this), false)
  }
}

new App(document.querySelector('#app'))
