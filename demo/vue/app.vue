<template>
  <div class="app">
    <h1>Numeric keyboard</h1>
    <div class="keyboard">
      <NumericKeyboard layout="tel" :theme="telTheme" entertext="send" @press="press"></NumericKeyboard>
      <p v-if="keyPressed == null" class="keyboard-output">Press the keyboard</p>
      <p v-else class="keyboard-output">Key({{keyPressed}}) is pressed</p>
    </div>
    <hr>
    <div class="input">
      <NumericInput type="number" placeholder="touch to input" format="^(?:\d+(?:\.\d{0,2})?)?$" v-model="amount" />
      <button @click="clear">clear</button>
    </div>
  </div>
</template>

<script>
  import { NumericKeyboard, NumericInput, keys } from 'numeric-keyboard'
  export default {
    components: {
      NumericKeyboard,
      NumericInput
    },
    data() {
      return {
        amount: null,
        telTheme: {
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
        keyPressed: null,
      }
    },
    methods: {
      press(key) {
        this.keyPressed = key
      },
      clear() {
        this.amount = null
      }
    }
  }
</script>

<style lang="stylus">
  body
    font-size 0.24rem
    padding 0.32rem
  h1
    text-align center
  .keyboard
    .numeric-keyboard
      height 3.6rem
      border 1px solid #cfd4da
    .keyboard-output
      font-size 0.32rem
  .input
    display flex
    align-items center
    .numeric-input
      font-size 0.36rem
      height 0.48rem
      border 1px solid #cfd4da
    button
      font-size 0.36rem
      line-height 0.48rem
      background #eee
      margin-left 0.2rem
</style>
