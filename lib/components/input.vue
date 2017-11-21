<template>
  <div class="numeric-input" :class="{ placeholder: rawValue.length === 0, readonly: readonly, disabled: disabled }" @touchend="focus">
    <input type="hidden" :name="name" :value="value" />
    <div>
      <span v-if="rawValue.length" v-for="(c, index) in rawValue" :data-index="index + 1">{{c}}</span><span v-if="rawValue.length === 0">{{placeholder}}</span><i v-if="cursorTimer" v-show="cursorVisible"></i>
    </div>
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
    format: {
      type: [String, Function]
    },
    keyboard: {
      type: Object
    }
  },
  data() {
    return {
      rawValue: [],
      cursorPos: 0,
      cursorVisible: true,
      cursorTimer: null
    }
  },
  created() {
    if (typeof this.format === 'function') {
      this._validate = (val) => {
        return this.format(val.join(''))
      }
    }
    else if (typeof this.format === 'string') {
      this._validate = (val) => {
        const reg = new RegExp(this.format)
        return reg.test(val.join(''))
      }
    }
    else {
      this._validate = val => true
    }
  },
  mounted() {
    if (this.autofocus && !this.readonly && !this.disabled) {
      this.openKeyboard()
    }
  },
  beforeDestroy() {
    window.clearInterval(this.cursorTimer)
    if (this._keyboard) {
      this._keyboard.$destroy()
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val != null) {
          this.rawValue = val.toString().split('')
          this.cursorPos = this.rawValue.length
        }
      }
    },
    rawValue(value) {
      value = value.join('')
      this.$emit('input', value && this.type === 'number' ? parseFloat(value, 10) : value)
    },
    cursorPos(value) {
      if (!this.cursorTimer) { return }
      this.$nextTick(() => {
        let cursor = this.$el.querySelector('i')
        if (this.cursorPos) {
          let charactor = this.$el.querySelector(`span:nth-of-type(${this.cursorPos})`)
          cursor.style.left = charactor.offsetLeft + charactor.offsetWidth + 'px'
        }
        else {
          cursor.style.left = 0
        }
      })
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
      this.cursorTimer = window.setInterval(() => {
        this.cursorVisible = !this.cursorVisible
      }, 500)
      this.cursorPos = this.rawValue.length
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
      window.clearInterval(this.cursorTimer)
      this.cursorTimer = null
    },
    focus(e) {
      e.stopPropagation()
      this.openKeyboard()
      if (this.cursorTimer) {
        this.cursorPos = +e.target.dataset.index || this.rawValue.length
      }
    },
    input(key) {
      let value = this.rawValue.slice()
      switch (key) {
        case 'esc':
        case 'enter':
          this.closeKeyboard()
          break
        case 'del':
          if (this.cursorPos > 0) {
            value.splice(this.cursorPos - 1, 1)
            this.rawValue = value
            this.cursorPos -= 1
          }
          break
        case '.':
          if (value && value.indexOf(key) === -1) {
            value.splice(this.cursorPos, 0, key)
            if (this._validate(value)) {
              this.rawValue = value
              this.cursorPos += 1
            }
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
          if (this.type === 'number' || typeof this.maxlength === 'undefined' || value.length < this.maxlength) {
            value.splice(this.cursorPos, 0, key)
            if (this._validate(value)) {
              this.rawValue = value
              this.cursorPos += 1
            }
          }
          break
      }
    }
  }
}

</script>

<style lang="stylus">

.numeric-input
  display inline-block
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
  div
    height 100%
    display inline-table
    position relative
    span
      display table-cell
      vertical-align middle
    i
      font-style normal
      font-weight 100
      pointer-events none
      position absolute
      top 50%
      left 0
      transform translate(-50%, -50%)
      &::after
        content '|'

</style>
