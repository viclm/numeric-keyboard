import './app.styl'
import { NumericKeyboard, NumericInput, keys } from 'numeric-keyboard'

new NumericKeyboard('.keyboard-ui', {
  layout: 'tel',
  entertext: 'send',
  onPress(key) {
    document.querySelector('.keyboard .output').innerText = `${typeof key}: ${key}`
  }
})

new NumericInput('.input-ui', {
  type: 'number',
  placeholder: 'touch to input',
  format: '^(?:\\d+(?:\\.\\d{0,2})?)?$',
  onInput(val) {
    document.querySelector('.input .output').innerText = `${typeof val}: ${val}`
  }
})