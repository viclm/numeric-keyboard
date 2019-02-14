<template>
  <section class="password">
    <div class="dialog">
      <h2>Conform password</h2>
      <div class="input">
        <span v-for="n in 6" :key="n" :class="{ fill: n <= password.length }"></span>
      </div>
      <v-numeric-keyboard :layout="layout" @press="press" />
    </div>
  </section>
</template>

<script>
import { NumericKeyboard, keys } from 'numeric-keyboard'

const PasswordLayout = [
  [
    {
      key: keys.ONE
    },
    {
      key: keys.TWO
    },
    {
      key: keys.THREE
    },
  ],
  [
    {
      key: keys.FOUR
    },
    {
      key: keys.FIVE
    },
    {
      key: keys.SIX
    },
  ],
  [
    {
      key: keys.SEVEN
    },
    {
      key: keys.EIGHT
    },
    {
      key: keys.NINE
    },
  ],
  [
    {
      key: keys.BLANK
    },
    {
      key: keys.ZERO
    },
    {
      key: keys.DEL
    },
  ],
]

export default {
  components: {
    'v-numeric-keyboard': NumericKeyboard
  },
  data() {
    return {
      layout: PasswordLayout,
      password: ''
    }
  },
  methods: {
    press(key) {
      if (key === keys.DEL) {
        this.password = this.password.slice(0, -1)
      }
      else {
        this.password = this.password + key
        if (this.password.length === 6) {
          setTimeout(() => this.$emit('confirm', this.password), 100)
        }
      }
    }
  }
}
</script>
