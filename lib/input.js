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
      document.addEventListener('touchend', this.close, false)
    },
    unregister() {
      if (!activeInput) {
        return
      }
      activeInput.closeKeyboard()
      activeInput = null
      document.removeEventListener('touchend', this.close, false)
    }
  }

})()

export const Options = {
  type: 'number',
  autofocus: false,
  disabled: false,
  readonly: false,
  maxlength: null,
  name: null,
  placeholder: null,
  value: null,
  format: val => true,
  keyboard: null
}

export const Mixins = {
  constructor(props) {
    this.props = Object.assign({}, props)
    if (typeof props.format === 'string') {
      this.props.format = val => new RegExp(props.format).test(val)
    }
    this.state = {
      inputElement: null,
      keyboardElement: null,
      keyboard: null,
      rawValue: [],
      cursorPos: 0,
      cursorVisible: false,
      cursorColor: null,
      cursorTimer: null
    }
  },
  
  destructor() {
    if (this.state.cursorTimer) {
      window.clearInterval(this.state.cursorTimer)
    }
    KeyboardCenter.unregister()
  },

  setValue(val) {
    if (val != null) {
      this.state.rawValue = val.toString().split('')
    }
    else {
      this.state.rawValue = []
    }
  },

  setCursorPos() {
    let cursor = this.state.inputElement.querySelector('i')
    if (this.state.cursorPos) {
      let charactor = this.state.inputElement.querySelector(`span:nth-of-type(${this.state.cursorPos})`)
      cursor.style.left = charactor.offsetLeft + charactor.offsetWidth + 'px'
    }
    else {
      cursor.style.left = 0
    }
  },

  openKeyboard() {
    if (this.state.keyboard) { return }

    let container = document.createElement('div')
    let shadow = document.createElement('div')
    let keyboard = document.createElement('div')
    let keyboardPlaceholder = document.createElement('div')
    container.style.cssText = 'position:fixed; bottom:0; left:0; width:100%; height:36%;'
    shadow.style.cssText = 'height:100%;'
    keyboard.style.cssText = 'position:absolute; top:0; right: 0; bottom: 0; left:0; transform: translateY(100%); box-shadow: 0 -2px 4px 0 #cfd4da'
    keyboard.appendChild(keyboardPlaceholder)
    container.appendChild(shadow)
    container.appendChild(keyboard)
    document.body.appendChild(container)

    this.state.keyboardElement = keyboard    
    this.state.keyboard = this.createKeyboard(
      keyboardPlaceholder,
      Object.assign({ layout: this.props.type }, this.props.keyboard),
      key => {
        this.input(key)
      }
    )
    animation((timestamp, frame, frames) => {
      keyboard.style.transform = `translateY(${(frames - frame) / frames * 100}%)`
    }, () => {}, 10)

    this.state.cursorTimer = window.setInterval(() => {
      this.state.cursorVisible = !this.state.cursorVisible
    }, 500)
    this.state.cursorPos = this.state.rawValue.length
    this.setCursorPos()

    KeyboardCenter.register(this)
    this.dispatch('focus')
  },

  closeKeyboard() {
    if (!this.state.keyboard) { return }

    let keyboard = this.state.keyboard
    let keyboardElement = this.state.keyboardElement
    animation((timestamp, frame, frames) => {
      keyboardElement.style.transform = `translateY(${frame / frames * 100}%)`
    }, () => {
      this.destroyKeyboard(keyboard)
      document.body.removeChild(keyboardElement.parentNode)
    }, 10)
    
    this.state.keyboard = null
    this.state.keyboardElement = null

    this.state.cursorPos = 0
    window.clearInterval(this.state.cursorTimer)
    this.state.cursorTimer = null

    KeyboardCenter.unregister()
    this.dispatch('blur')
  },

  input(key) {
    const p = this.props
    const s = this.state
    const input = key => {
      let args = key ? [s.cursorPos, 0, key] : [s.cursorPos - 1, 1]
      let rawValue = s.rawValue.slice()
      rawValue.splice.apply(rawValue, args)
      if (this.props.format(rawValue.join(''))) {
        s.rawValue.splice.apply(s.rawValue, args)
        s.cursorPos += key ? 1 : -1
        this.setCursorPos()
        let val = s.rawValue.join('')
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
          input(key)
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
    if (this.props.autofocus && !this.props.readonly && !this.props.disabled) {
      this.openKeyboard()
    }
    this.state.cursorColor = window.getComputedStyle(el).getPropertyValue('color')
    this.state.inputElement = el
  },

  onFocus(e) {
    e.stopPropagation()
    this.openKeyboard()
    this.state.cursorPos = +e.target.dataset.index || this.state.rawValue.length
    this.setCursorPos()
  },

  createKeyboard(el, options, callback) {
    throw new Error('createKeyboard method must be overrided!')
  },

  destroyKeyboard(keyboardClass) {
    throw new Error('destroyKeyboard method must be overrided!')
  },

  dispatch(event, ...args) {
    throw new Error('dispatch method must be overrided!')
  }
}