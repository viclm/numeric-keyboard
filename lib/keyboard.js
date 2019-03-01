import { ENTER } from './keys.js'
import Layouts from './layouts/index.js'

export const Options = {
  layout: 'number',
  entertext: 'enter'
}

export const Mixins = {
  init(options) {
    const { layout } = options

    let resolvedLayout
    if (typeof layout === 'string') {
      resolvedLayout = Layouts[layout]
      if (!Array.isArray(resolvedLayout)) {
        throw new Error(`${layout} is not a build-in layout.`)
      }
    }
    else {
      resolvedLayout = layout
      if (!Array.isArray(resolvedLayout) || !resolvedLayout.every(i => Array.isArray(i))) {
        throw new Error(`custom layout must be a two-dimensional array.`)
      }
    }

    this.kp = options
    this.ks = { resolvedLayout }
  },

  destroy() {

  },

  set(key, value) {
    this.ks[key] = value
  },
    
  onTouchend(key) {
    this.dispatch('press', key)
    if (key === ENTER) {
      this.dispatch('enterpress')
    }
  },

  dispatch(/* event, payload */) {
    throw new Error('dispatch method must be overrided!')
  }

}
