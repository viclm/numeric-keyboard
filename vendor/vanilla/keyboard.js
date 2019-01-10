import { createdom, capitalize } from './util'
import { Options as OPTIONS, Mixins } from 'lib/keyboard'
import 'lib/style/keyboard.styl'

export default function Keyboard(el, options) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }

  options = Object.assign({}, OPTIONS, options)

  this.init(options)

  let element = createdom({
    tag: 'table',
    attrs: {
      'class': 'numeric-keyboard'
    },
    children: this.ks.layout.map(r => {
      return {
        tag: 'tr',
        children: r.map(c => {
          const k = this.ks.keys[c.key]
          return {
            tag: 'td',
            attrs: {
              rowspan: c.rowspan,
              colspan: c.colspan,
              'data-key': k.key,
              'data-icon': k.icon,
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

Keyboard.prototype = Mixins
Keyboard.prototype.constructor = Keyboard
Keyboard.prototype.dispatch = function (event, ...args) {
  const callback = this.kp[`on${capitalize(event)}`]
  if (callback) {
    callback(...args)
  } 
}
Keyboard.prototype.touchend = function (e) {
  if (e.target.tagName === 'TD') {
    const key = e.target.getAttribute('data-key')
    this.onTouchend(isNaN(+key) ? key : +key, e)
  }
}
