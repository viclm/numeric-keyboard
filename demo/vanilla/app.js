import './app.styl'
import { NumericKeyboard, NumericInput, keys } from 'numeric-keyboard'

new NumericKeyboard('.keyboard-ui', {
  layout: 'tel',
  theme: {
    key: {
      [keys.DEL]: {
        color: '#ffffff',
        backgroundColor: ['#a8b0bc', '#929ba8']
      },
      [keys.ENTER]: {
        color: '#ffffff',
        backgroundColor: ['#a8b0bc', '#929ba8']
      }
    }
  },
  entertext: 'send',
  onPress(key) {
    document.querySelector('.keyboard-output').innerText = `Key(${key}) is pressed`
  }
})

const input = new NumericInput('.input-ui', {
  type: 'number',
  placeholder: 'touch to input',
  format: '^(?:\\d+(?:\\.\\d{0,2})?)?$',
  onInput(value) {
    console.log(value)
  }
})

document.querySelector('.input button').addEventListener('touchend', function () {
  input.setValue()
}, false)