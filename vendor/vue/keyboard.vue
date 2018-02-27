<template>
  <div class="numeric-keyboard">
    <table>
      <tr v-for="(r, i) in _layout" :key="i">
        <td v-for="c in r"
          :key="c.key"
          :rowspan="c.rowspan"
          :colspan="c.colspan"
          :data-icon="_keys[c.key].icon"
          :style="_keys[c.key].style"
          @touchstart="ontouchstart(_keys[c.key], $event)"
          @touchend="ontouchend(_keys[c.key], $event)"
          @click="onclick(_keys[c.key], $event)">
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
      _layout: null,
      _keys: null
    }
  },
  created() {
    this.init(this._props)
  },
  methods: {
    dispatch(event, ...args) {
      this.$emit(event, ...args)
    }
  }
}

</script>

<style lang="stylus" src="lib/style/keyboard.styl"></style>
