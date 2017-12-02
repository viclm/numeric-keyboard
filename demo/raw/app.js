import './app.styl'
import { NumericKeyboard, keys } from 'numeric-keyboard'

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
  onpress(key) {
    document.querySelector('.keyboard-output').innerText = `Key(${key}) is pressed`
  }
})
