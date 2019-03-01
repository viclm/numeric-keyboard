import React from 'react'
import { NumericKeyboard, NumericInput, Keys } from 'numeric-keyboard' // eslint-disable-line no-unused-vars
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

class Password extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super()
    this.state = {
      password: ''
    }
  }

  press(key) {
    if (key === Keys.DEL) {
      this.setState(state => ({ password: state.password.slice(0, -1) }))
    }
    else {
      this.setState(state => ({ password: state.password + key }), () => {
        if (this.state.password.length === 6) {
          setTimeout(() => this.props.onConfirm.call(null, this.state.password), 100)
        }
      })
    }
  }

  render() {
    return <section className="password">
      <div className="dialog">
        <h2>Conform password</h2>
        <div className="input">
          {[1, 2, 3, 4, 5, 6].map(n => n > this.state.password.length ? <span key={n}></span> : <span key={n} className="fill"></span>)}
        </div>
        <NumericKeyboard layout={PasswordLayout} onPress={this.press.bind(this)} />
      </div>
    </section>
  }
}

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      amount: '',
      shouldOpenPassword: false
    }
  }

  inputAmout(amount) {
    this.setState({ amount: amount })
  }

  confirmAmount(e) {
    if (e) {
      e.preventDefault()
    }
    if (this.state.amount) {
      this.setState({ shouldOpenPassword: true })
    }
  }

  confirmPassword(password) {
    this.setState({ shouldOpenPassword: false })
    setTimeout(() => alert(`Amount: ${this.state.amount}\nPassword: ${password}`), 200)
  }

  render() {
    return <main className="app">
      <header>
        <h1>Transfer to Arthur</h1>
      </header>
      <form onSubmit={this.confirmAmount.bind(this)}>
        <label>Amount</label>
        <div className="input">
          <NumericInput type="number" autofocus value={this.state.amount} entertext="Confirm" format="^(?:\d+(?:\.\d{0,2})?)?$" onInput={this.inputAmout.bind(this)} onEnterpress={this.confirmAmount.bind(this)} />
        </div>
        <input type="submit" value="Confirm" disabled={!this.state.amount} />
      </form>
      <footer>
        <p>Power by Numeric Keyboard</p>
      </footer>
      { this.state.shouldOpenPassword && <Password onConfirm={this.confirmPassword.bind(this)} /> }
    </main>
  }
}
