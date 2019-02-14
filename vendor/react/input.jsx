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
          {
            this.ks.rawValue.length === 0
            ? <div className="numeric-input-placeholder">{this.props.placeholder}</div>
            : <div className="numeric-input-text">{this.ks.rawValue.map((c, i) => <span key={i} data-index={i}>{c}</span>)}</div>
          }
          {this.ks.cursorTimer && <div className="numeric-input-cursor" style={{background: this.ks.cursorColor}}></div>}
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

  createKeyboard(el, options, events, callback) {
    for (let event in events) {
      options[`on${event.replace(rfirst, s => s.toUpperCase())}`] = events[event]
    }
    ReactDOM.render(<Keyboard ref={instance => instance && callback(instance)} {...options} />, el)
  }

  destroyKeyboard(el) {
    ReactDOM.unmountComponentAtNode(el)
  }
}

Input.defaultProps = Options
