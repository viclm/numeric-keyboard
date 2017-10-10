<template>
  <div class="numeric-input" :class="{ placeholder: !rawValue, readonly: readonly, disabled: disabled }" @touchend="focus">
    <input type="hidden" :name="name" :value="value" />
    <span>{{rawValue || placeholder}}</span>
  </div>
</template>

<script>

import Vue from 'vue'
import Keyboard from './keyboard.vue'

const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout

const animation = function (iterable, done = () => {}, frames = 60) {
  let running = true
  let frame = 0
  function closure(timestamp) {
    if (!running) { return }
    iterable(timestamp, ++frame, frames)
    if (frame < frames) {
      requestAnimationFrame(closure, 0)
    }
    else {
      done()
    }
  }
  requestAnimationFrame(closure, 0)
  return () => {
    running = false
  }
}


const keyboardCenter = (function () {

  let activeInput

  return {
    open(input) {
      this.close()
      activeInput = input
      document.addEventListener('touchend', this.close, false)
    },
    close() {
      if (!activeInput) {
        return
      }
      activeInput.closeKeyboard()
      activeInput = null
      document.removeEventListener('touchend', this.close, false)
    }
  }

})()

export default {
  props: {
    type: {
      type: String,
      default: 'number'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number
    },
    name: {
      type: String
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    },
    keyboard: {
      type: Object
    }
  },
  data() {
    return {
      rawValue: ''
    }
  },
  mounted() {
    this.rawValue = this.value == null ? '' : this.value + ''
    if (this.autofocus && !this.readonly && !this.disabled) {
      this.openKeyboard()
    }
  },
  watch: {
    rawValue(value) {
      this.$emit('input', value && this.type === 'number' ? parseFloat(value, 10) : value)
    }
  },
  methods: {
    openKeyboard() {
      if (this._keyboard) { return }
      let keyboard = new Vue({
        render: h => h(Keyboard, {
          props: Object.assign({
            layout: this.type
          }, this.keyboard),
          on: {
            press: key => {
              this.input(key)
            }
          }
        }),
        destroyed() {
          document.body.removeChild(container)
        }
      })
      keyboard.$mount()
      this._keyboard = keyboard
      let container = document.createElement('div')
      let shadow = document.createElement('div')
      let element = keyboard.$el
      let borderColor = keyboard.$el.querySelector('td').style.borderColor
      container.style.cssText = 'position:fixed; bottom:0; left:0; width:100%; height:36%;'
      shadow.style.cssText = 'height:100%;'
      element.style.cssText = `position:absolute; top:0; left:0; transform: translateY(100%); border-top: 1px solid ${borderColor}; box-shadow: 0 2px 2px 2px ${borderColor}`
      container.appendChild(shadow)
      container.appendChild(element)
      document.body.appendChild(container)
      animation((timestamp, frame, frames) => {
        element.style.transform = `translateY(${(frames - frame) / frames * 100}%)`
      }, () => {}, 10)
      keyboardCenter.open(this)
    },
    closeKeyboard() {
      if (!this._keyboard) { return }
      let keyboard = this._keyboard
      let element = keyboard.$el
      this._keyboard = null
      animation((timestamp, frame, frames) => {
        element.style.transform = `translateY(${frame / frames * 100}%)`
      }, () => {
        keyboard.$destroy()
      }, 10)
      keyboardCenter.close()
    },
    focus(e) {
      e.stopPropagation()
      this.openKeyboard()
    },
    input(key) {
      switch (key) {
        case 'esc':
        case 'enter':
          this.closeKeyboard()
          break
        case 'del':
          this.rawValue = this.rawValue.slice(0, -1)
          break
        case '.':
          if (this.rawValue && this.rawValue.indexOf(key) === -1) {
            this.rawValue += key
          }
          break
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          let rawValue = this.rawValue
          if (this.type === 'number' || rawValue.length < this.maxlength) {
            rawValue += key
            this.rawValue = rawValue
          }
          break
      }
    }
  }
}

</script>

<style lang="stylus">

.numeric-input
  display inline-table
  background white
  box-sizing border-box
  width 12em
  height 1.2em
  padding 2px
  text-align left
  &.placeholder
    color #757575
  &.readonly, &.disabled
    opacity 0.5
    pointer-events none
  span
    display table-cell
    vertical-align middle

</style>
