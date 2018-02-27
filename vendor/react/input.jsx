import React from 'react'
import ReactDOM from 'react-dom'
import Keyboard from './keyboard.jsx' // eslint-disable-line
import { Options, Mixins } from 'lib/input'
import 'lib/style/input.styl'

const rfirst = /^[a-z]/

class Parent extends React.Component {}
Object.assign(Parent.prototype, Mixins)

export default class Input extends Parent {
  constructor(props) {
    super(props)
    this.init(props)
    this.state = this.ks
  }

  render() {
    let className = 'numeric-input'
    if (this.props.readonly) {
      className += ' readonly'
    }
    if (this.props.disabled) {
      className += ' disabled'
    }
    return <div className={className} onTouchEnd={this.onFocus.bind(this)}>
      <input type="hidden" name={this.props.name} value={this.props.value} />
      {this.ks &&
        <div>
          {this.ks.rawValue.length === 0 && <span className="numeric-input-placeholder">{this.props.placeholder}</span>}
          {this.ks.rawValue.map((c, i) => <span key={i} data-index={i + 1}>{c}</span>)}
          {this.ks.cursorTimer && <i style={{backgroundColor: this.ks.cursorColor}}></i>}
        </div>
      }
    </div>
  }

  componentDidMount() {
    this.onMounted(ReactDOM.findDOMNode(this))
  }

  componentWillUnmount() {
    this.destroy()
  }

  set(key, value) {
    Mixins.set.call(this, key, value)
    this.setState({
      [key]: value
    })
  }

  moveCursor() {
    this.forceUpdate(() => {
      Mixins.moveCursor.call(this)
    })
  }
  
  dispatch(event, ...args) {
    const callback = this.props[`on${event.replace(rfirst, s => s.toUpperCase())}`]
    if (callback) {
      callback(...args)
    }
  }

  createKeyboard(el, options, callback) {
    return ReactDOM.render(<Keyboard {...options} onPress={callback} />, el)
  }

  destroyKeyboard(keyboard, keyboardElement) {
    ReactDOM.unmountComponentAtNode(keyboardElement)
  }
}

Input.defaultProps = Options
