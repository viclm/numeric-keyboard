import * as Keys from './keys.js'
import { animate } from './utils/animate.js'

const RNumber = /^\d*(?:\.\d*)?$/
const RTel = /^\d*$/

const KeyboardCenter = (function () {
  
  let activeInput

  return {
    register(input) {
      this.unregister()
      activeInput = input
      document.addEventListener('touchend', this.unregister, false)
    },
    unregister(e) {
      if (!activeInput) {
        return
      }
      if (e && (activeInput.ks.inputElement.contains(e.target) || activeInput.ks.keyboardElement.contains(e.target))) {
        return
      }
      activeInput.closeKeyboard()
      activeInput = null
      document.removeEventListener('touchend', this.unregister, false)
    }
  }

})()

export const Options = {
  type: 'number',
  value: '',
  autofocus: false,
  disabled: false,
  readonly: false,
  maxlength: Infinity,
  name: '',
  placeholder: '',
  format: '^',
  layout: 'number',
  entertext: 'enter'
}

export const Mixins = {

  init(options) {
    let formatFn = options.format
    if (typeof formatFn === 'string') {
      formatFn = (rformat => (val => rformat.test(val)))(new RegExp(options.format))
    }

    const value = options.value
    const rawValue = value.toString().split('')
    const cursorPos = rawValue.length

    this.kp = options
    this.ks = {
      formatFn,
      value,
      rawValue,
      cursorPos,
      cursorColor: null,
      cursorActive: false,
      keyboard: null,
      inputElement: null,
      keyboardElement: null
    }
  },
  
  destroy() {
    KeyboardCenter.unregister()
  },

  set(key, value) {
    this.ks[key] = value
  },

  onMounted(el) {
    this.set('inputElement', el)
    this.set('cursorColor', window.getComputedStyle(el).getPropertyValue('color'))

    if (this.kp.autofocus && !this.kp.readonly && !this.kp.disabled) {
      setTimeout(() => this.openKeyboard(), 500)
    }
  },

  onUpdated() {
    this.moveCursor()
  },

  onFocus(e) {
    e.stopPropagation()
    this.openKeyboard()
    const cursorPos = +e.target.dataset.index
    this.set('cursorPos', isNaN(cursorPos) ? this.ks.rawValue.length : cursorPos)
  },

  input(key) {
    const { type, maxlength } = this.kp
    const { rawValue, cursorPos, formatFn } = this.ks

    const input = key => {
      const isAdd = typeof key !== 'undefined'
      const newRawValue = rawValue.slice()
      if (isAdd) {
        newRawValue.splice(cursorPos, 0, key)
      }
      else {
        newRawValue.splice(cursorPos - 1, 1)
      }

      let newValue = newRawValue.join('')

      if (formatFn(newValue)) {
        if (type === 'number') {
          if (!RNumber.test(newValue)) { return }
          newValue = parseFloat(newValue, 10)
          if (isNaN(newValue)) {
            newValue = ''
          }
        }
        else if (newValue.length > maxlength || type === 'tel' && !RTel.test(newValue)) { return }

        this.set('value', newValue)
        this.set('rawValue', newRawValue)
        this.set('cursorPos', isAdd ? cursorPos + 1 : cursorPos - 1)
        this.dispatch('input', newValue)
      }
    }

    switch (key) {
      case Keys.BLANK:
        break
      case Keys.ESC:
        this.closeKeyboard()
        break
      case Keys.ENTER:
        this.closeKeyboard()
        this.dispatch('enterpress')
        break
      case Keys.DEL:
        if (cursorPos > 0) {
          input()
        }
        break
      case Keys.DOT   :
      case Keys.ZERO  :
      case Keys.ONE   :
      case Keys.TWO   :
      case Keys.THREE :
      case Keys.FOUR  :
      case Keys.FIVE  :
      case Keys.SIX   :
      case Keys.SEVEN :
      case Keys.EIGHT :
      case Keys.NINE  :
      default:
        input(key)
        break
    }
  },

  moveCursor() {
    if (!this.ks.cursorActive) {
      return
    }

    const elCursor = this.ks.inputElement.querySelector('.numeric-input-cursor')
    const elText = this.ks.inputElement.querySelector('.numeric-input-text')
    const elCharactor = elText.querySelector(`span:nth-child(${this.ks.cursorPos})`)

    if (!elCharactor) {
      elCursor.style.transform = 'translateX(0)'
      elText.style.transform = 'translateX(0)'
      return
    }

    const cursorOffset = elCharactor.offsetLeft + elCharactor.offsetWidth
    const maxVisibleWidth = elText.parentNode.offsetWidth
    elCursor.style.transform = `translateX(${Math.min(maxVisibleWidth - 1, cursorOffset)}px)`
    elText.style.transform = `translateX(${Math.min(0, maxVisibleWidth - cursorOffset)}px)`
  },

  openKeyboard() {
    if (this.ks.keyboard) { return }

    const elContainer = document.createElement('div')
    const elShadow = document.createElement('div')
    const elKeyboard = document.createElement('div')
    elContainer.style.cssText = 'position:fixed; bottom:0; left:0; width:100%; height:36%;'
    elShadow.style.cssText = 'height:100%;'
    elKeyboard.style.cssText = 'position:absolute; top:0; right: 0; bottom: 0; left:0; transform: translateY(100%); box-shadow: 0 -2px 4px 0 #cfd4da'
    elContainer.appendChild(elShadow)
    elContainer.appendChild(elKeyboard)
    document.body.appendChild(elContainer)

    this.createKeyboard(
      elKeyboard,
      {
        layout: this.kp.layout || this.kp.type,
        entertext: this.kp.entertext
      },
      {
        press: this.input.bind(this)
      },
      keyboard => this.set('keyboard', keyboard)
    )

    animate((timestamp, frame, frames) => {
      elKeyboard.style.transform = `translateY(${(frames - frame) / frames * 100}%)`
    }, () => {}, 10)

    this.set('keyboardElement', elKeyboard)
    this.set('cursorActive', true)
    this.set('cursorPos', this.ks.rawValue.length)

    this.dispatch('focus')
    KeyboardCenter.register(this)
  },

  closeKeyboard() {
    if (!this.ks.keyboard) { return }

    const keyboard = this.ks.keyboard
    const elKeyboard = this.ks.keyboardElement

    animate((timestamp, frame, frames) => {
      elKeyboard.style.transform = `translateY(${frame / frames * 100}%)`
    }, () => {
      setTimeout(() => {
        this.destroyKeyboard(elKeyboard, keyboard)
        document.body.removeChild(elKeyboard.parentNode)
      }, 300)
    }, 10)
    
    this.set('keyboard', null)
    this.set('keyboardElement', null)
    this.set('cursorActive', false)
    this.set('cursorPos', 0)

    this.dispatch('blur')
    KeyboardCenter.unregister()
  },

  createKeyboard(/* el, options, events, callback */) {
    throw new Error('createKeyboard method must be overrided!')
  },

  destroyKeyboard(/* el, keyboard */) {
    throw new Error('destroyKeyboard method must be overrided!')
  },

  dispatch(/* event, payload */) {
    throw new Error('dispatch method must be overrided!')
  }

}
