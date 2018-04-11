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

const KeyboardCenter = (function () {
  
  let activeInput

  return {
    register(input) {
      this.unregister()
      activeInput = input
      document.addEventListener('touchend', this.unregister, false)
    },
    unregister() {
      if (!activeInput) {
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
  maxlength: null,
  name: null,
  placeholder: null,
  format: '^',
  keyboard: null
}

export const Mixins = {
  init(props) {
    this.kp = Object.assign({}, props)
    if (typeof props.format === 'string') {
      this.kp.format = val => new RegExp(props.format).test(val)
    }
    this.ks = {
      inputElement: null,
      keyboardElement: null,
      keyboard: null,
      rawValue: [],
      cursorPos: 0,
      cursorColor: null,
      cursorTimer: null
    }
  },
  
  destroy() {
    KeyboardCenter.unregister()
  },

  set(key, value) {
    this.ks[key] = value

    if (key === 'cursorPos' && this.ks.cursorTimer) {
      this.moveCursor()
    }
  },

  setValue(val) {
    if (val != null) {
      this.set('rawValue', val.toString().split(''))
    }
    else {
      this.set('rawValue', [])
    }

    this.set('cursorPos', this.ks.rawValue.length)
  },

  moveCursor() {
    let cursor = this.ks.inputElement.querySelector('i')
    if (this.ks.cursorPos) {
      let charactor = this.ks.inputElement.querySelector(`span:nth-of-type(${this.ks.cursorPos})`)
      cursor.style.left = charactor.offsetLeft + charactor.offsetWidth + 'px'
    }
    else {
      cursor.style.left = 0
    }
  },

  openKeyboard() {
    if (this.ks.keyboard) { return }

    let container = document.createElement('div')
    let shadow = document.createElement('div')
    let keyboard = document.createElement('div')
    container.style.cssText = 'position:fixed; bottom:0; left:0; width:100%; height:36%;'
    shadow.style.cssText = 'height:100%;'
    keyboard.style.cssText = 'position:absolute; top:0; right: 0; bottom: 0; left:0; transform: translateY(100%); box-shadow: 0 -2px 4px 0 #cfd4da'
    container.appendChild(shadow)
    container.appendChild(keyboard)
    document.body.appendChild(container)

    this.set('keyboardElement', keyboard)
    this.set('keyboard', this.createKeyboard(
      keyboard,
      Object.assign({ layout: this.kp.type }, this.kp.keyboard),
      key => {
        this.input(key)
      }
    ))
    animation((timestamp, frame, frames) => {
      keyboard.style.transform = `translateY(${(frames - frame) / frames * 100}%)`
    }, () => {}, 10)

    this.set('cursorTimer', 1)
    this.set('cursorPos', this.ks.rawValue.length)

    KeyboardCenter.register(this)
    this.dispatch('focus')
  },

  closeKeyboard() {
    if (!this.ks.keyboard) { return }

    let keyboard = this.ks.keyboard
    let keyboardElement = this.ks.keyboardElement
    animation((timestamp, frame, frames) => {
      keyboardElement.style.transform = `translateY(${frame / frames * 100}%)`
    }, () => {
      setTimeout(() => {
        this.destroyKeyboard(keyboard, keyboardElement)
        document.body.removeChild(keyboardElement.parentNode)
      }, 300)
    }, 10)
    
    this.set('keyboard', null)
    this.set('keyboardElement', null)

    this.set('cursorTimer', null)
    this.set('cursorPos', 0)

    KeyboardCenter.unregister()
    this.dispatch('blur')
  },

  input(key) {
    const p = this.kp
    const s = this.ks
    const input = key => {
      let isAdd = typeof key !== 'undefined'
      let cursorPos = s.cursorPos
      let args = isAdd ? [cursorPos, 0, key] : [cursorPos - 1, 1]
      let rawValue = s.rawValue.slice()
      rawValue.splice.apply(rawValue, args)
      if (p.format(rawValue.join(''))) {
        this.set('rawValue', rawValue)
        this.set('cursorPos', isAdd ? cursorPos + 1 : cursorPos - 1)
        let val = rawValue.join('')
        if (val && p.type === 'number') {
          val = parseFloat(val, 10)
        }
        this.dispatch('input', val)
      }
    }
    switch (key) {
      case 'esc':
      case 'enter':
        this.closeKeyboard()
        break
      case 'del':
        if (s.cursorPos > 0) {
          input()
        }
        break
      case '.':
        if (s.rawValue.indexOf(key) === -1) {
          if (p.type === 'number' && s.rawValue.length === 0) {
            input(0)
            input(key)
          }
          else {
            input(key)
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
        if (p.type === 'number' || p.maxlength == null || s.rawValue.length < p.maxlength) {
          input(key)
        }
        break
    }
  },
  
  onMounted(el) {
    if (this.kp.autofocus && !this.kp.readonly && !this.kp.disabled) {
      this.openKeyboard()
    }
    this.set('cursorColor', window.getComputedStyle(el).getPropertyValue('color'))
    this.set('inputElement', el)
    this.setValue(this.kp.value)
  },

  onFocus(e) {
    e.stopPropagation()
    this.openKeyboard()
    this.set('cursorPos', +e.target.dataset.index || this.ks.rawValue.length)
  },

  createKeyboard(/* el, options, callback */) {
    throw new Error('createKeyboard method must be overrided!')
  },

  destroyKeyboard(/* keyboardClass */) {
    throw new Error('destroyKeyboard method must be overrided!')
  },

  dispatch(/* event, ...args */) {
    throw new Error('dispatch method must be overrided!')
  }
}
