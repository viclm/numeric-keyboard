import React from 'react'
import { NumericKeyboard, NumericInput, keys } from 'numeric-keyboard'
import './app.styl'

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

class Password extends React.Component {
  constructor() {
    super()
    this.state = {
      password: ''
    }
  }

  press(key) {
    if (key === keys.DEL) {
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
      amount: null,
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
          <NumericInput type="number" autofocus entertext="Confirm" format="^(?:\d+(?:\.\d{0,2})?)?$" onInput={this.inputAmout.bind(this)} onEnterpress={this.confirmAmount.bind(this)} />
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
