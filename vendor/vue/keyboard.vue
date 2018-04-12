<template>
  <div class="numeric-keyboard">
    <table>
      <tr v-for="(r, i) in ks.layout" :key="i">
        <td v-for="c in r"
          :key="c.key"
          :rowspan="c.rowspan"
          :colspan="c.colspan"
          :data-icon="ks.keys[c.key].icon"
          :style="ks.keys[c.key].style"
          @touchstart="onTouchstart(ks.keys[c.key], $event)"
          @touchend="onTouchend(ks.keys[c.key], $event)">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

import { Options, Mixins } from 'lib/keyboard'

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
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    dispatch(event, ...args) {
      this.$emit(event, ...args)
    }
  }
}

</script>

<style lang="stylus" src="lib/style/keyboard.styl"></style>
