import { createdom, capitalize } from './util'
import Keyboard from './keyboard'
import { Options as OPTIONS, Mixins } from 'lib/input'
import 'lib/style/input.styl'

export default function Input(el, options) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }

  options = Object.assign({}, OPTIONS, options)

  this.init(options)

  let classnames = ['numeric-input']
  if (this.kp.readonly) {
    classnames.push('readonly')
  }
  if (this.kp.disabled) {
    classnames.push('disabled')
  }

  let element = createdom({
    tag: 'div',
    attrs: {
      'class': classnames.join(' ')
    },
    children: [
      {
        tag: 'input',
        attrs: {
          type: 'hidden',
          name: this.kp.name,
          value: this.kp.value
        }
      },
      {
        tag: 'div'
      }
    ]
  })

  this.$input = element.querySelector('input')
  this.$fakeinput = element.querySelector('div')

  el.parentNode.replaceChild(element, el)
  this.onMounted(element)
  this.renderInput()

  element.addEventListener('touchend', this.onFocus.bind(this), false)
}

Input.prototype = Object.assign({}, Mixins)
Input.prototype.constructor = Input

Input.prototype.set = function(key, value) {
  Mixins.set.call(this, key, value)
  if (key === 'cursorTimer' || key === 'rawValue') {
    this.renderInput()
  }
}

Input.prototype.createKeyboard = function (el, options, callback) {
  let element = document.createElement('div')
  let keyboard = new Keyboard(element, {
    ...options,
    onPress: callback
  })
  el.appendChild(element)
  return keyboard
}

Input.prototype.destroyKeyboard = function () {
}

Input.prototype.dispatch = function (event, ...args) {
  const callback = this.kp[`on${capitalize(event)}`]
  if (callback) {
    callback(...args)
  } 
}

Input.prototype.renderInput = function () {
  let html = ''
  if (this.ks.rawValue.length === 0) {
    html += `<span class="numeric-input-placeholder">${this.kp.placeholder}</span>`
  }
  else {
    for (let i = 0; i < this.ks.rawValue.length ; i++) {
      html += `<span data-index="${i+1}">${this.ks.rawValue[i]}</span>`
    }
  }
  if (this.ks.cursorTimer) {
    html += `<i style="background-color: ${this.ks.cursorColor}"></i>`
  }
  this.$fakeinput.innerHTML = html
}
