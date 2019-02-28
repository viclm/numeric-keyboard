import { capitalize, createdom } from 'lib/utils/string.js'
import { Options, Mixins } from 'lib/keyboard.js'
import { ENTER } from 'lib/keys.js'
import 'lib/styles/keyboard.styl'

export const NumericKeyboard = function NumericKeyboard(el, options) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }

  options = Object.assign({}, Options, options)

  this.init(options)

  let element = createdom({
    tag: 'table',
    attrs: {
      'class': 'numeric-keyboard'
    },
    children: this.ks.resolvedLayout.map(r => {
      return {
        tag: 'tr',
        children: r.map(c => {
          return {
            tag: 'td',
            attrs: {
              rowspan: c.rowspan,
              colspan: c.colspan,
              'data-key': c.key,
              'data-icon': c.key === ENTER ? this.kp.entertext : c.key,
              class: 'numeric-keyboard-key'
            }
          }
        })
      }
    })
  })

  el.parentNode.replaceChild(element, el)

  element.addEventListener('touchend', this.touchend.bind(this), false)
}

NumericKeyboard.prototype = Mixins
NumericKeyboard.prototype.constructor = NumericKeyboard

NumericKeyboard.prototype.dispatch = function (event, ...args) {
  const callback = this.kp[`on${capitalize(event)}`]
  if (callback) {
    callback(...args)
  } 
}

NumericKeyboard.prototype.touchend = function (e) {
  if (e.target.tagName === 'TD') {
    const key = e.target.getAttribute('data-key')
    this.onTouchend(key, e)
  }
}
