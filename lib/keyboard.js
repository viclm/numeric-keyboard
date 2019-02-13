import layouts from './layouts'
import { ENTER } from './constants/keys'

export const Options = {
  layout: 'number',
  entertext: '1enter'
}

export const Mixins = {
  init(options) {
    let { layout, entertext } = options
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

    for (let r of layout) {
      for (let c of r) {
        keys[c.key] = {
          key: c.key,
          icon: c.key === ENTER ? entertext : c.key
        }
      }
    }

    this.kp = Object.assign({}, options)
    this.ks = {
      layout,
      keys
    }
  },

  destroy() {

  },

  set(key, value) {
    this.ks[key] = value
  },

  dispatch(/* event, ...args */) {
    throw new Error('dispatch method must be overrided!')
  },
    
  onTouchend(key) {
    this.dispatch('press', key)
    if (key === ENTER) {
      this.dispatch('enterpress')
    }
  }

}
