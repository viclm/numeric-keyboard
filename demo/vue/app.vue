<template>
  <div class="app">
    <h1 class="title">Numeric keyboard</h1>
    <section class="keyboard">
      <NumericKeyboard layout="tel" entertext="send" @press="press"></NumericKeyboard>
      <p class="output">{{keyboardOutput}}</p>
    </section>
    <section class="input">
      <NumericInput type="number" placeholder="touch to input" format="^(?:\d+(?:\.\d{0,2})?)?$" v-model="val" />
      <p class="output">{{inputOutput}}</p>
    </section>
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
        keyboardOutput: null,
        val: null
      }
    },
    computed: {
      inputOutput() {
        return `${typeof this.val}: ${this.val}`
      }
    },
    methods: {
      press(key) {
        this.keyboardOutput = `${typeof key}: ${key}`
      }
    }
  }
</script>

<style lang="stylus">
body
  font-size 0.24rem

.title
  text-align center

.keyboard .numeric-keyboard
  width 100%
  height 3.6rem

.input .numeric-input
  font-size 0.36rem
  width 100%
  line-height 0.72rem
  height 0.72rem
  border 1px solid #cfd4da
  box-sizing border-box

.keyboard .output,
.input .output
  font-size 0.36rem
  &::before
    content 'Output> '
    font-weight bold
</style>
