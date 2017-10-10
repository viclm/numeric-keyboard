<template>
  <div class="numeric-keyboard">
    <table>
      <tr v-for="r in _layout">
        <td v-for="c in r" :data-icon="c.k.code === 'enter' ? entertext : c.k.code" :rowspan="c.rowspan" :colspan="c.colspan" :style="c.k.style" @touchstart="touchstart(c.k, $event)" @touchend="touchend(c.k, $event)"></td>
      </tr>
    </table>
  </div>
</template>

<script>

import themes from '../theme'
import layouts from '../layouts'

class Key {
  constructor(code) {
    this._code = code
    this._style = null
    this._activeStyle = null
  }

  get code() {
    return this._code
  }

  get style() {
    return this._style
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

export default {
  props: {
    layout: {
      type: [String, Array],
      default: 'number'
    },
    theme: {
      type: [String, Object],
      default: 'default'
    },
    entertext: {
      type: String,
      default: 'enter'
    }
  },
  data() {
    return {
      _layout: null
    }
  },
  created() {
    this.normalizeLayout()
  },
  methods: {
    normalizeLayout() {
      let theme = this.theme
      if (typeof theme === 'string') {
        if (!themes.hasOwnProperty(theme)) {
          throw new Error(`${theme} is not a build-in theme.`)
        }
        theme = themes[theme]
      }
      else {
        theme = Object.assign({}, themes.default, theme)
      }

      let layout = this.layout
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
          c.k = new Key(c.key)
          c.k.addStyle(Object.assign({}, theme.global, theme.key[c.key]))
        }
      }
      this._layout = layout
    },
    touchstart(key, e) {
      key.active(e.target)
    },
    touchend(key, e) {
      e.stopPropagation()
      key.deactive(e.target)
      this.$emit('press', key.code)
    }
  }
}

</script>

<style lang="stylus">

@font-face
  font-family vue-numeric-keyboard
  src url('../assets/vue-numeric-keyboard.woff') format('woff')
  font-weight normal
  font-style normal

.numeric-keyboard
  width 100%
  height 100%

  table
    width 100%
    height 100%
    text-align center
    table-layout fixed
    border-collapse collapse
  tr:first-child td
    border-top none
  td
    transition background-color 0.5s
    border-style solid
    border-width 1px 1px 0 1px
    &:first-child
      border-left none
    &:last-child
      border-right 0
    &[data-icon]::before
      content attr(data-icon)
    &[data-icon=del]::before,
    &[data-icon=esc]::before
      font-family vue-numeric-keyboard !important
      content attr(data-icon)
      speak none
      font-style normal
      font-weight normal
      font-variant normal
      text-transform none
      line-height 1

      letter-spacing 0
      -webkit-font-feature-settings "liga"
      font-feature-settings "liga"
      -webkit-font-variant-ligatures discretionary-ligatures
      font-variant-ligatures discretionary-ligatures

      -webkit-font-smoothing antialiased

</style>
