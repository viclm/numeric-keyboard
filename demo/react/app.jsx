import React from 'react'
import { NumericKeyboard, NumericInput, keys } from 'numeric-keyboard'
import './app.styl'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      keyPressed: null
    }
  }

  press(key) {
    this.setState({
      keyPressed: key
    })
  }

  clear() {
    
  }

  render() {
    return <div className="app">
      <h1>Numeric keyboard</h1>
      <div className="keyboard">
        <NumericKeyboard layout="tel" theme={this.props.telTheme} entertext="send" onPress={this.press.bind(this)} />
        <p className="keyboard-output">{this.state.keyPressed != null ? `Key(${this.state.keyPressed}) is pressed`: 'Press the keyboard'}</p>
      </div>
      <div className="input">
        <NumericInput type="number" placeholder="touch to input" format="^(?:\d+(?:\.\d{0,2})?)?$" />
        <button onClick={this.clear.bind(this)}>Clear</button>
      </div>
    </div>
  }
}

App.defaultProps = {
  telTheme: {
    key: {
      [keys.DEL]: {
        color: '#ffffff',
        backgroundColor: ['#a8b0bc', '#929ba8']
      },
      [keys.ENTER]: {
        color: '#ffffff',
        backgroundColor: ['#a8b0bc', '#929ba8']
      }
    }
  }
}
