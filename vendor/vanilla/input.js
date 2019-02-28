import { createdom, capitalize } from 'lib/utils/string.js'
import { NumericKeyboard } from './keyboard.js'
import { Options, Mixins } from 'lib/input.js'
import 'lib/styles/input.styl'

export const NumericInput = function NumericInput(el, options) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }

  options = Object.assign({}, Options, options)

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
  this.renderInput()
  this.onMounted(element)

  element.addEventListener('touchend', this.onFocus.bind(this), false)
}

NumericInput.prototype = Object.assign({}, Mixins)
NumericInput.prototype.constructor = NumericInput

NumericInput.prototype.set = function(key, value) {
  Mixins.set.call(this, key, value)
  if (key === 'cursorActive' || key === 'rawValue') {
    this.renderInput()
  }
}

NumericInput.prototype.dispatch = function (event, ...args) {
  const callback = this.kp[`on${capitalize(event)}`]
  if (callback) {
    callback(...args)
  } 
}

NumericInput.prototype.createKeyboard = function (el, options, events, callback) {
  const element = document.createElement('div')
  el.appendChild(element)
  for (let event in events) {
    options[`on${capitalize(event)}`] = events[event]
  }
  callback(new NumericKeyboard(element, options))
}

NumericInput.prototype.destroyKeyboard = function (el, keyboard) {
  keyboard.destroy()
}

NumericInput.prototype.renderInput = function () {
  let html = ''
  html += '<div class="numeric-input-text">'
  for (let i = 0; i < this.ks.rawValue.length ; i++) {
    html += `<span data-index="${i}">${this.ks.rawValue[i]}</span>`
  }
  html += '</div>'
  if (this.ks.rawValue.length === 0) {
    html += `<div class="numeric-input-placeholder">${this.kp.placeholder}</div>`
  }
  if (this.ks.cursorActive) {
    html += `<div class="numeric-input-cursor" style="background: ${this.ks.cursorColor}"></div>`
  }
  this.$fakeinput.innerHTML = html
  setTimeout(() => { this.onUpdated() }, 0)
}
