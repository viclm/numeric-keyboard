import React from 'react'
import { NumericKeyboard, NumericInput, keys } from 'numeric-keyboard'
import './app.styl'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      keyboardOutput: null,
      inputOutput: null
    }
  }

  press(key) {
    this.setState({
      keyboardOutput: `${typeof key}: ${key}`
    })
  }

  input(val) {
    this.setState({
      inputOutput: `${typeof val}: ${val}`
    })
  }

  render() {
    return <div className="app">
      <h1 className="title">Numeric keyboard</h1>
      <section className="keyboard">
        <NumericKeyboard layout="tel" entertext="send" onPress={this.press.bind(this)} />
        <p className="output">{this.state.keyboardOutput}</p>
      </section>
      <section className="input">
        <NumericInput type="number" placeholder="touch to input" format="^(?:\d+(?:\.\d{0,2})?)?$" onInput={this.input.bind(this)} />
        <p className="output">{this.state.inputOutput}</p>
      </section>
    </div>
  }
}