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
      <label>Amount: </label>
      <NumericInput type="number" placeholder="touch to input" :value="amount" @input="input" />
    </div>
    <button @click="reset">Click reset to 10</button>
    <hr>
    <div class="input">
      <label>Amount: </label>
      <NumericInput type="number" placeholder="touch to input" format="^\d+(\.\d{0,2})?$" :value="amount2" @input="input2" />
    </div>
    <p>Limit input up to two decimal</p>
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
        amount: 0,
        amount2: 0,
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
      input(value) {
        this.amount = value
      },
      input2(value) {
        this.amount2 = value
      },
      reset() {
        this.amount = 10
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
  button
    font-size 0.36rem
    margin 0.1rem 0
</style>
