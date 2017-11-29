<template>
  <div class="app">
    <h1>Vue numeric keyboard</h1>
    <div class="keyboard">
      <NumericKeyboard layout="tel" :theme="telTheme" entertext="send" @press="press"></NumericKeyboard>
      <p v-if="keyPressed == null" class="keyboard-output">Press the keyboard</p>
      <p v-else class="keyboard-output">Key({{keyPressed}}) is pressed</p>
    </div>
    <hr>
    <div class="input">
      <NumericInput type="number" placeholder="touch to input" format="^(?:\d+(?:\.\d{0,2})?)?$" v-model="amount" />
    </div>
  </div>
</template>

<script>
  import { NumericKeyboard, NumericInput, keys } from 'vue-numeric-keyboard/lib'
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
    .numeric-input
      font-size 0.36rem
      height 0.48rem
      border 1px solid #cfd4da
</style>
