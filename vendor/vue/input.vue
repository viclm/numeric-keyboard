<template>
  <div class="numeric-input" :class="{ readonly: readonly, disabled: disabled }" @touchend="onFocus">
    <input type="hidden" :name="name" :value="value" />
    <div v-if="ks">
      <div v-if="ks.rawValue.length === 0" class="numeric-input-placeholder">{{placeholder}}</div>
      <div v-else class="numeric-input-text"><span v-for="(c, i) in ks.rawValue" :key="i" :data-index="i">{{c}}</span></div>
      <div v-if="ks.cursorTimer" class="numeric-input-cursor" :style="{background: ks.cursorColor}"></div>
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
      ks: null
    }
  },
  created() {
    this.init(this._props)
  },
  mounted() {
    this.onMounted(this.$el)
  },
  beforeDestroy() {
    this.destroy()
  },
  watch: {
    value: {
      handler(val) {
        let current = this.ks.rawValue.join('')
        if (this.kp.type === 'number') {
          current = parseFloat(current, 10)
          if (current === val || (isNaN(current) && isNaN(val))) {
            return
          }
        }
        else if (current === val) {
          return
        }
        this.setValue(val)
      }
    }
  },
  methods: {
    moveCursor() {
      this.$forceUpdate()
      this.$nextTick(() => {
        Mixins.moveCursor.call(this)
      })
    },
    dispatch(event, ...args) {
      this.$emit(event, ...args)
    },
    createKeyboard(el, options, callback) {
      let keyboard = new Vue({
        render: h => h(Keyboard, {
          props: options,
          on: {
            press: callback
          }
        })
      })
      keyboard.$mount()
      el.appendChild(keyboard.$el)
      return keyboard
    },
    destroyKeyboard(keyboard) {
      keyboard.$destroy()
    }
  }
}

</script>

<style lang="stylus" src="lib/style/input.styl"></style>
