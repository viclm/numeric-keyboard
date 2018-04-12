import { createdom, capitalize } from './util'
import { Options as OPTIONS, Mixins } from 'lib/keyboard'
import 'lib/style/keyboard.styl'

const rcapital = /[A-Z]/g

export default function Keyboard(el, options) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }

  options = Object.assign({}, OPTIONS, options)

  this.init(options)

  let element = createdom({
    tag: 'div',
    attrs: {
      'class': 'numeric-keyboard'
    },
    children: [
      {
        tag: 'table',
        children: this.ks.layout.map(r => {
          return {
            tag: 'tr',
            children: r.map(c => {
              const k = this.ks.keys[c.key]
              let csstext = ''
              for (let name in k.style) {
                csstext += `${name.replace(rcapital, s => '-' + s.toLowerCase())}:${k.style[name]};`
              }
              return {
                tag: 'td',
                attrs: {
                  rowspan: c.rowspan,
                  colspan: c.colspan,
                  'data-key': k.code,
                  'data-icon': k.icon,
                  style: csstext
                }
              }
            })
          }
        })
      }
    ]
  })

  el.parentNode.replaceChild(element, el)

  element.addEventListener('touchstart', this.touchstart.bind(this), false)
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
Keyboard.prototype.touchstart = function (e) {
  if (e.target.tagName === 'TD') {
    this.onTouchstart(this.ks.keys[e.target.getAttribute('data-key')], e)
  }
}
Keyboard.prototype.touchend = function (e) {
  if (e.target.tagName === 'TD') {
    this.onTouchend(this.ks.keys[e.target.getAttribute('data-key')], e)
  }
}
