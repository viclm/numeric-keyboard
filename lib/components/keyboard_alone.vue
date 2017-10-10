<template>
  <div>
    <div></div>
    <v-keyboard :v-bind="keyboard"></v-keyboard>
  </div>
</template>

<script>

import Keyboard from './keyboard.vue'

export default {
  components: {
    'v-keyboard': Keyboard
  },
  props: {
    keyboard: {
      type: Object
    }
  }
}
</script>

<style lang="stylus">

</style>
