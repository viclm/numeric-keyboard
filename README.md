# Numeric Keyboard

[![Build Status](https://travis-ci.org/viclm/numeric-keyboard.svg?branch=master)](https://travis-ci.org/viclm/numeric-keyboard)

A numeric keyboard works in mobile browsers. It contains a pluggable keyboard component and a input box in replace of native input element.

The numeric keyboard have several versions: plain javascript class, React component and Vue component.

:movie_camera: [Watch the demo video](https://fast.wistia.net/embed/iframe/f40gilnlxp) :sunny:


## Table of contents

- [Install](#install)
- [Keyboard](#keyboard)
- [Input box ](#input-box)
- [Contributing](#contributing)
- [License](#license)

## Install

You can install it via yarn
```shell
yarn add numeric-keyboard
```

Config webpack to use the right version
```javascript
resolve: {
  alias: {
    // use Vue component
    'numeric-keyboard': 'numeric-keyboard/dist/numeric_keyboard.vue.js'
  }
},
```

## Keyboard

The keyboard is a pluggable component. In order to be able to work properly in a real scene, it usually needs to match an output interface.

### Usage

#### Plain JavaScript
```javascript
import { NumericKeyboard } from 'numeric-keyboard'
new NumericKeyboard('.keyboard', {
  layout: 'tel',
  onpress(key) {
    ...
  }
})
```

#### React
```jsx
import { NumericKeyboard } from 'numeric-keyboard'
class App extends React.Component {
  press(key) {
    ...
  }
  render() {
    return <div className="keyboard">
      <NumericKeyboard layout="tel" onPress={this.press.bind(this)} />
    </div>
  }
}
```

#### Vue
```vue
<template>
   <div class="keyboard">
     <NumericKeyboard layout="tel" @press="press" />
   </div>
</template>

<script>
  import { NumericKeyboard } from 'numeric-keyboard'
  export default {
    components: {
      NumericKeyboard
    },
    methods: {
      press(key) {
        ...
      }
    }
  }
</script>
```

### Options/Props

```javascript
// change the layout of keyboard
 layout: {
   type: [String, Array],
   default: 'number'
 },
 // change the style of keyboard
 theme: {
   type: [String, Object],
   default: 'default'
 },
 // change the label of submit button
 entertext: {
   type: String,
   default: 'enter'
 }
```

#### `layout`
There are two build-in layout called **number** and **tel** which can be used as a replace of system keyboard. You can still rearrange all the keys to create your own layout. The layout object is two-dimension array which constructs a table layout, you can make table-specific operations like merging cells.

##### number layout
![number layout](https://raw.githubusercontent.com/viclm/numeric-keyboard/master/demo/snapshot_number.png)

##### tel layout
![tel layout](https://raw.githubusercontent.com/viclm/numeric-keyboard/master/demo/snapshot_tel.png)

##### custom layout
```javascript
// the build-in number layout
import { keys } from 'numeric-keyboard'
[
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
    {
      key: keys.DEL,
      rowspan: 2,
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
    {
      key: keys.ENTER,
      rowspan: 2,
    },
  ],
  [
    {
      key: keys.DOT
    },
    {
      key: keys.ZERO
    },
    {
      key: keys.ESC
    },
  ],
]
```

#### `theme`
The style of keyboard can be modified global or per key, currently it only supports several limit style like fontSize or color, however you can override CSS directly for complicated style.
```javascript
// the default style declaration
import { keys } from 'numeric-keyboard'
{
  global: {
    fontSize: '0.46rem',
    color: '#000000',
    backgroundColor: ['#ffffff', '#929ca8'], // specify a pair of colors for active pseudo class
    borderColor: '#cfd4da',
  },
  key: {
    [keys.ENTER]: {
      color: '#ffffff',
      backgroundColor: ['#007aff', '#0051a8'],
    },
  }
}
```

### Callbacks/Events

#### `press`
the `press` event is emit with a key code when the key is pressed.

## Input box

The keyboard above can not work with native input element which will call the native keyboard when focus (that's not what we expect), the input box is a virtual input element, will be good in most cases except you care about some native feature like magnifier in ios.

### Usage

#### Plain JavaScript
```javascript
// comming soon
```

#### React
```jsx
class App extends React.Component {
  input(val) {
    ...
  },
  render() {
    return <NumericInput type="number" placeholder="touch to input" onInput={this.input.bind(this)} />
  }
}
```

#### Vue
```vue
<template>
  <div class="input">
    <label>Amount: </label>
    <NumericInput placeholder="touch to input" v-model="amount" />
  </div>
</template>

<script>
  import { NumericInput } from 'numeric-keyboard'
  export default {
    components: {
      NumericInput
    },
    data() {
      return {
       amount: null
      }
    }
  }
</script>

```

### Options/Props

```javascript
// There are only two types: number and tel because it only contains a numeric keyboard
type: {
  type:String,
  default: 'number'
},
autofocus: {
  type: Boolean,
  default: false
},
disabled: {
  type: Boolean,
  default: false
},
maxlength: {
  type: Number
},
name: {
  type: String
},
placeholder: {
  type: String
},
readonly: {
  type: Boolean,
  default: false
},
value: {
  type: [String, Number]
},
// Limit the format of input
format: {
  type: [String, Function]
},
// The keyboard options will be used by keyboard component inside
keyboard: {
  type: Object
}
```

#### html5 compatible
The input box supports most of the standard attributes, you can refer the html spec for details.

#### format
Parse a regexp string or function to limit the input.

#### keyboard
Config the keyboard component which will be called when focus.

### Callback/Events

#### `input`
The `input` event is emit when the value of input changes.

## Contributing
Welcome to contributing, the guidelines is being drafted.

## License

Licensed under the MIT license.
