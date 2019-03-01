import Vue from 'vue'
import { NumericKeyboard, NumericInput, Keys } from 'numeric-keyboard'
import '../styles.styl'

const PasswordLayout = [
  [
    {
      key: Keys.ONE
    },
    {
      key: Keys.TWO
    },
    {
      key: Keys.THREE
    },
  ],
  [
    {
      key: Keys.FOUR
    },
    {
      key: Keys.FIVE
    },
    {
      key: Keys.SIX
    },
  ],
  [
    {
      key: Keys.SEVEN
    },
    {
      key: Keys.EIGHT
    },
    {
      key: Keys.NINE
    },
  ],
  [
    {
      key: Keys.BLANK
    },
    {
      key: Keys.ZERO
    },
    {
      key: Keys.DEL
    },
  ],
]

const Password = Vue.extend({
  components: {
    'v-numeric-keyboard': NumericKeyboard
  },

  data() {
    return {
      PasswordLayout,
      password: ''
    }
  },

  methods: {
    press(key) {
      if (key === Keys.DEL) {
        this.password = this.password.slice(0, -1)
      }
      else {
        this.password = this.password + key
        if (this.password.length === 6) {
          setTimeout(() => this.$emit('confirm', this.password), 100)
        }
      }
    }
  },

  template: `
  <section class="password">
    <div class="dialog">
      <h2>Conform password</h2>
      <div class="input">
        <span v-for="n in 6" :key="n" :class="{ fill: n <= password.length }"></span>
      </div>
      <v-numeric-keyboard :layout="PasswordLayout" @press="press" />
    </div>
  </section>
  `

})

export default Vue.extend({
  components: {
    'v-numeric-input': NumericInput,
    'v-password': Password
  },

  data() {
    return {
      amount: '',
      shouldOpenPassword: false
    }
  },

  methods: {
    confirmAmount() {
      if (this.amount) {
        this.shouldOpenPassword = true
      }
    },

    confirmPassword(password) {
      this.shouldOpenPassword = false
      setTimeout(() => alert(`Amount: ${this.amount}\nPassword: ${password}`), 200)
    }
  },

  template: `
  <main className="app">
    <header>
      <h1>Transfer to Arthur</h1>
    </header>
    <form @submit.prevent="confirmAmount">
      <label>Amount</label>
      <div class="input">
        <v-numeric-input type="number" autofocus entertext="Confirm" format="^(?:\\d+(?:\\.\\d{0,2})?)?$" v-model="amount" @enterpress="confirmAmount" />
      </div>
      <input type="submit" value="Confirm" :disabled="!amount" />
    </form>
    <footer>
      <p>Power by Numeric Keyboard</p>
    </footer>
    <v-password v-if="shouldOpenPassword" @confirm="confirmPassword" />
  </main>
  `
})
