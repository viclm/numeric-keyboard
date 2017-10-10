<template>
  <div class="app">
    <h1>Vue numeric keyboard</h1>
    <div class="keyboard">
      <NumericKeyboard layout="tel" :theme="telTheme" entertext="send" @press="press"></NumericKeyboard>
      <p v-if="keyPressed == null" class="keyboard-output">Press the keyboard</p>
      <p v-else class="keyboard-output">Key({{keyPressed}}) is pressed</p>
    </div>
    <div class="input">
      <label>Amount: </label>
      <NumericInput placeholder="touch to input" />
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
    text-align center
    padding 0.32rem
  .keyboard
    .numeric-keyboard
      height 3.6rem !important
      border 1px solid #cfd4da
    p
      font-size 0.36rem
  .input
    font-size 0.36rem
    display flex
    justify-content flex-start
    align-items center
    .numeric-input
      height 0.48rem
      margin-left 0.1rem
      border 1px solid #cfd4da
</style>
