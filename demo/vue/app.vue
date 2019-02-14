<template>
  <main className="app">
    <header>
      <h1>Transfer to Arthur</h1>
    </header>
    <form @submit.prevent="confirmAmount">
      <label>Amount</label>
      <div class="input">
        <v-numeric-input type="number" autofocus entertext="Confirm" format="^(?:\d+(?:\.\d{0,2})?)?$" v-model="amount" @enterpress="confirmAmount" />
      </div>
      <input type="submit" value="Confirm" :disabled="!amount" />
    </form>
    <footer>
      <p>Power by Numeric Keyboard</p>
    </footer>
    <v-password v-if="shouldOpenPassword" @confirm="confirmPassword" />
  </main>
</template>

<script>
import { NumericInput } from 'numeric-keyboard'
import Password from './password.vue'

export default {
  components: {
    'v-numeric-input': NumericInput,
    'v-password': Password
  },
  data() {
    return {
      amount: null,
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
  }
}
</script>

<style lang="stylus" src="./app.styl"></style>
