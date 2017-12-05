<template>
  <div class="numeric-input" :class="{ readonly: readonly, disabled: disabled }" @touchend="onFocus">
    <input type="hidden" :name="name" :value="value" />
    <div v-if="state">
      <span class="numeric-input-placeholder" v-if="state.rawValue.length === 0">{{placeholder}}</span><span v-for="(c, i) in state.rawValue" :key="i" :data-index="i + 1">{{c}}</span><i v-if="state.cursorTimer" v-show="state.cursorVisible" :style="{backgroundColor: state.cursorColor}"></i>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import Keyboard from './keyboard.vue'
import { Options, Mixins } from 'lib/input'

export default {
  mixins: [{
    methods: Mixins
  }],
  props: (function () {
    let props = {}
    for (let name in Options) {
      props[name] = {
        default: Options[name]
      }
    }
    return props
  })(),
  data() {
    return {
      props: null,
      state: null
    }
  },
  created() {
    this.constructor(this._props)
  },
  mounted() {
    this.onMounted(this.$el)
  },
  beforeDestroy() {
    this.destructor()
  },
  watch: {
    value: {
      handler(val) {
        let current = this.state.rawValue.join('')
        if (current === val || parseFloat(current, 10) === val) {
          return
        }
        this.setValue(val)
      }
    }
  },
  methods: {
    setCursorPos() {
      this.$forceUpdate()
      this.$nextTick(() => {
        Mixins.setCursorPos.call(this)
      })
    },
    createKeyboard(el, options, callback) {
      return new Vue({
        el,
        render: h => h(Keyboard, {
          props: options,
          on: {
            press: callback
          }
        })
      })
    },
    destroyKeyboard(keyboardClass) {
      keyboardClass.$destroy()
    },
    dispatch(event, ...args) {
      this.$emit(event, ...args)
    }
  }
}

</script>

<style lang="stylus" src="lib/style/input.styl"></style>