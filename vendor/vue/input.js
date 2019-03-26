import Vue from 'vue'
import { typeofConstructor } from 'lib/utils/type.js'
import { Options, Mixins } from 'lib/input.js'
import { NumericKeyboard } from './keyboard.js'
import 'lib/styles/input.styl'

export const NumericInput = Vue.extend({

  mixins: [{ methods: Mixins }],

  props: (() => {
    let props = {}
    for (let name in Options) {
      props[name] = { default: Options[name], type: [typeofConstructor(Options[name]), String, Number, Boolean, Array, Object, Date, Function] }
    }
    return props
  })(),

  data() {
    return {
      ks: null
    }
  },

  watch: {
    value(newValue) {
      if (newValue === this.ks.value) { return }
      const rawValue = newValue.toString().split('')
      const cursorPos = rawValue.length
      this.set('rawValue', rawValue)
      this.set('cursorPos', cursorPos)
    }
  },

  methods: {
    onFocus(e) {
      Mixins.onFocus.call(this, e)
      this.$forceUpdate()
    },

    dispatch(event, payload) {
      this.$emit(event, payload)
    },

    createKeyboard(el, options, events, callback) {
      const keyboard = new Vue({
        render: h => h(NumericKeyboard, {
          props: options,
          on: events
        })
      })
      keyboard.$mount()
      el.appendChild(keyboard.$el)
      callback(keyboard)
    },

    destroyKeyboard(el, keyboard) {
      keyboard.$destroy()
    }
  },

  created() {
    this.init(this._props)
  },

  mounted() {
    this.onMounted(this.$el)
  },

  updated() {
    this.onUpdated()
  },

  beforeDestroy() {
    this.destroy()
  },

  render() {
    let className = 'numeric-input'
    if (this.kp.readonly) {
      className += ' readonly'
    }
    if (this.kp.disabled) {
      className += ' disabled'
    }

    return (
      <div class={className} vOn:touchend={this.onFocus.bind(this)}>
        <div>
          <div class="numeric-input-text">{this.ks.rawValue.map((c, i) => <span key={i} data-index={i}>{c}</span>)}</div>
          {this.ks.rawValue.length === 0 && <div class="numeric-input-placeholder">{this.kp.placeholder}</div>}
          {this.ks.cursorActive && <div class="numeric-input-cursor" style={{background: this.ks.cursorColor}}></div>}
        </div>
      </div>
    )
  }

})
