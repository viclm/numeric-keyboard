import { Component, createElement } from 'lib/utils/vdom.js' // eslint-disable-line no-unused-vars
import { capitalize } from 'lib/utils/string.js'
import { Options, Mixins } from 'lib/input.js'
import { NumericKeyboard } from './keyboard.js' // eslint-disable-line no-unused-vars
import 'lib/styles/input.styl'

class Parent extends Component {}
Object.assign(Parent.prototype, Mixins)

export class NumericInput extends Parent {

  constructor(props) {
    super(props)
    this.init(this.props)
    this.state = this.ks
  }

  mounted(element) {
    this.onMounted(element)
  }

  updated() {
    this.onUpdated()
  }

  setProps(nextProps) {
    if (nextProps.value !== this.props.value && nextProps.value !== this.ks.value) {
      const rawValue = nextProps.value.toString().split('')
      const cursorPos = rawValue.length
      this.set('rawValue', rawValue)
      this.set('cursorPos', cursorPos)
    }
    super.setProps(nextProps)
  }

  set(key, value) {
    super.set(key, value)
    this.setState({ [key]: value })
  }

  createKeyboard(el, options, events, callback) {
    for (let event in events) {
      options[`on${capitalize(event)}`] = events[event]
    }
    const keyboard = new NumericKeyboard(options)
    keyboard.mount()
    el.appendChild(keyboard._element)
    callback(keyboard)
  }

  destroyKeyboard(el, keyboard) {
    keyboard.destroy()
  }
  
  dispatch(event, payload) {
    const callback = this.props[`on${capitalize(event)}`]
    if (callback) {
      callback(payload)
    }
  }

  render() {
    let className = 'numeric-input'
    if (this.kp.readonly) {
      className += ' readonly'
    }
    if (this.kp.disabled) {
      className += ' disabled'
    }

    return (
      <div className={className} onTouchEnd={this.onFocus.bind(this)}>
        <div>
          <div className="numeric-input-text">{this.ks.rawValue.map((c, i) => <span key={i} data-index={i}>{c}</span>)}</div>
          {this.ks.rawValue.length === 0 && <div className="numeric-input-placeholder">{this.kp.placeholder}</div>}
          {this.ks.cursorActive && <div className="numeric-input-cursor" style={{background: this.ks.cursorColor}}></div>}
        </div>
      </div>
    )
  }

}

NumericInput.defaultProps = Options
