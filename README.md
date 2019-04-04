# Numeric Keyboard

[![Build Status](https://travis-ci.org/viclm/numeric-keyboard.svg?branch=master)](https://travis-ci.org/viclm/numeric-keyboard)
[![npm package](https://img.shields.io/npm/v/numeric-keyboard.svg)](https://www.npmjs.org/package/numeric-keyboard)

A custom virtual numeric keyboard works in mobile browsers. It contains a virtual input box which would invoke the numeric keyboard instead of system keyboard, the virtual input box supports many html5 standard properties and also has a nice cursor to make it behaves like native input element as much as possible.
Besides, the numeric keyboard is a pluggable component can be used together with other input interfaces.

The numeric keyboard is created respectively for **Vanilla JavaScript**, **React**, **Angular** and **Vue**.

> for **React**, **Angular** and **Vue**, only the latest version is supported.

:cn: [中文说明](https://github.com/viclm/numeric-keyboard/blob/master/docs/README.cn.md) :cn: :cn: :cn: :cn:

![snapshot](https://raw.githubusercontent.com/viclm/numeric-keyboard/master/docs/demo.gif)

## Table of contents

- [Install](#install)
- [Usage](#usage)
- [Keyboard](#keyboard)
- [Contributing](#contributing)
- [License](#license)

## Install

You can install it via **Yarn**
```shell
yarn add numeric-keyboard
```

Config **Webpack** to use the right version
```javascript
resolve: {
  alias: {
    // use Vue component for example
    'numeric-keyboard$': 'numeric-keyboard/dist/numeric_keyboard.vue.js'
  }
},
```


## Usage

#### Vanilla JavaScript
```javascript
import { NumericInput } from 'numeric-keyboard'
new NumericInput({
  type: 'number',
  placeholder: 'touch to input',
  onInput(value) {
    ...
  }
}).mount('.input')
```

#### React
```jsx
import { NumericInput } from 'numeric-keyboard'
class App extends React.Component {
  input(val) {
    ...
  },
  render() {
    return <div className="input">
      <label>Amount: </label>
      <NumericInput type="number" placeholder="touch to input" onInput={this.input.bind(this)} />
    </div>
  }
}
```

#### Angular
```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <div className="input">
      <label>Amount: </label>
      <numeric-input type="number" placeholder="touch to input" [(ngModel)]="amount"></numeric-input>
    </div>
  `,
})
export class AppComponent {
  public amount: number | string = ''
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
        amount: ''
      }
    }
  }
</script>

```

### Options/Props

As a substitute for native input element, the input box supports most of the standard attributes, you can refer the HTML spec for details.

```javascript
// There are only two types: number and tel, the corresponding layout of keyboard would be invoked by default.
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
// Passs a regexp string or function to limit the input.
format: {
  type: [String, Function]
},
// change the layout of keyboard
layout: {
 type: [String, Array],
 default: 'number'
},
// change the label of keyboard enter key, use iconfont for icon.
entertext: {
 type: String,
 default: 'enter'
}
```

### Callback/Events

#### `input`
The `input` event is emitted when the value of input changes. The first argument for the callback is the value of the input box rather than an event object from a native input element. A `onInput()` callback is used in vanilla javascript version.

#### `enterpress`
The `enterpress` event is emitted when the enter key of keyboard is pressed.


## Keyboard

The keyboard is a pluggable component which supports custom layout. In order to be able to work properly in a real scene, it usually needs to match an output interface.

### Usage

#### Vanilla JavaScript
```javascript
import { NumericKeyboard } from 'numeric-keyboard'
new NumericKeyboard('.keyboard', {
  layout: 'tel',
  onPress(key) {
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

#### Angular
```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <div class="keyboard">
      <numeric-keyboard layout="tel" (onPress)="press($event)"></numeric-keyboard>
    </div>
  `,
})
export class AppComponent {
  press(key) {
    ...
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
// change the label of keyboard enter key, use iconfont for icon.
entertext: {
 type: String,
 default: 'enter'
}
```

#### `layout`
There are two built-in layouts called **number** and **tel** which can be used as a replacement of system keyboard.
You can still rearrange all the keys to create your own layout. The layout object is a two-dimension array which constructs a table layout, you can make table-specific operations like merging cells.

##### number layout
![number layout](https://raw.githubusercontent.com/viclm/numeric-keyboard/master/docs/snapshot_number.png)

##### tel layout
![tel layout](https://raw.githubusercontent.com/viclm/numeric-keyboard/master/docs/snapshot_tel.png)

##### custom layout
```javascript
// code sample for the build-in number layout
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

### Callbacks/Events

#### `press`
the `press` event is emitted with a key code when the key is pressed. The argument for the callback is the key just pressed. A `onPress()` callback is used in vanilla javascript version.

#### `enterpress`
The `enterpress` event is emitted when the enter key of keyboard is pressed.


## Contributing
Welcome to contributing, the guidelines are being drafted.


## License
Licensed under the MIT license.
