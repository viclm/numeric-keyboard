import themes from './theme'
import layouts from './layouts'
import { ENTER } from './constants/keys'

export class Key {
  constructor(code) {
    this._code = code
    this._label = null
    this._style = null
    this._activeStyle = null
  }

  get code() {
    return this._code
  }
  
  get icon() {
    return this._label || this._code
  }

  get style() {
    return this._style
  }

  addLabel(label) {
    this._label = label
  }

  addStyle(style) {
    let active = {}
    for (let name in style) {
      let s = style[name]
      if (Array.isArray(s) && s.length === 2) {
        style[name] = s[0]
        active[name] = s
      }
    }
    this._style = style
    this._activeStyle = active
  }

  active(target) {
    if (this._activeStyle) {
      for (let name in this._activeStyle) {
        target.style[name] = this._activeStyle[name][1]
      }
    }
  }

  deactive(target) {
    if (this._activeStyle) {
      for (let name in this._activeStyle) {
        target.style[name] = this._activeStyle[name][0]
      }
    }
  }

}

export const Options = {
  layout: 'number',
  theme: 'default',
  entertext: 'enter'
}

export const Mixins = {
  init(options) {
    let { layout, theme, entertext } = options
    let keys = {}
    if (typeof layout === 'string') {
      if (!layouts.hasOwnProperty(layout)) {
        throw new Error(`${layout} is not a build-in layout.`)
      }
      layout = layouts[layout]
    }
    else {
      if (!Array.isArray(layout) || !layout.every(i => Array.isArray(i))) {
        throw new Error(`custom layout must be a two-dimensional array.`)
      }
    }

    if (typeof theme === 'string') {
      if (!themes.hasOwnProperty(theme)) {
        throw new Error(`${theme} is not a build-in theme.`)
      }
      theme = themes[theme]
    }
    else {
      theme = Object.assign({}, themes.default, theme)
    }

    for (let r of layout) {
      for (let c of r) {
        keys[c.key] = new Key(c.key)
        keys[c.key].addStyle(Object.assign({}, theme.global, theme.key[c.key]))
        if (c.key === ENTER) {
          keys[c.key].addLabel(entertext)
        }
      }
    }

    this._layout = layout
    this._theme = theme
    this._keys = keys
  },

  dispatch(/* event, ...args */) {
    throw new Error('dispatch method must be overrided!')
  },
    
  ontouchstart(key, event) {
    key.active(event.target)
  },

  ontouchend(key, event) {
    key.deactive(event.target)
    event.stopPropagation()
    this.dispatch('press', key.code)
  },

  onclick() {
    // this.dispatch('press', key.code)
  }
}
