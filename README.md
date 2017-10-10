# Numeric Keyboard

[![Build Status](https://travis-ci.org/viclm/vue-numeric-keyboard.svg?branch=master)](https://travis-ci.org/viclm/vue-numeric-keyboard)

A numeric keyboard used in mobile created by Vue 2 component.

![demo](https://cdn.pbrd.co/images/GO6SxIS.jpg)

## Install

```
yarn add vue-numeric-keyboard
```

## Usage

```
<template>
   <div class="keyboard">
     <NumericKeyboard layout="tel" :theme="telTheme" entertext="send" @press="press"></NumericKeyboard>
   </div>
</template>

<script>
  import { NumericKeyboard, keys } from 'vue-numeric-keyboard'
  export default {
    components: {
      NumericKeyboard
    },
    data() {
      return {
        telTheme: {
          key: {
            [keys.DEL]: {
              color: '#ffffff',
              backgroundColor: ['#a8b0bc', '#929ba8']
            },
            [keys.ENTER]: {
              color: '#ffffff',
              backgroundColor: ['#a8b0bc', '#929ba8']
            }
          }
        }
      }
    },
    methods: {
      press(key) {
        ...
      }
    }
  }
</script>
```

## options

### layout
There are two build-in layout called **number** and **tel** which can be used as a replace of system keyboard. You can still rearrange all the keys to create your own layout.

The code below create a build-in number layout

```
import { keys } from 'vue-numeric-keyboard'

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

### theme
You can change the default style of keyboard, the config here only support several limit style, you can override CSS directly for complicated style.

The code below shows the default style declaration

```
{
  global: {
    fontSize: '0.46rem',
    color: '#000000',
    backgroundColor: ['#ffffff', '#929ca8'],
    borderColor: '#cfd4da',
  },
  key: {
    [ENTER]: {
      color: '#ffffff',
      backgroundColor: ['#007aff', '#0051a8'],
    },
  }
}
```

### entertext
The label text for submit button is "enter" default, you can change it to anything

## events

### press
the `press` event is emit with a key code when the key is pressed.

## input + keyboard suit

The keyboard which created by javascript can not work with normal text input element, so a custom text input is needed always. The component provide a input + keyboard suit which can be used in a normally form situation.

The `NumericInput` component contains a custom input and keyboard

```
<template>
  <div class="input">
    <label>Amount: </label>
    <NumericInput placeholder="touch to input" v-model="amount" />
  </div>
</template>

<script>
  import { NumericInput } from 'vue-numeric-keyboard/lib'
  export default {
    components: {
      NumericInput
    },
    data() {
      return {
       amount: 0
      }
    }
  }
</script>

```

### options
Because  it is a replace of html input element, most properties is supported.

#### type
Because this is a numeric keyboard componet, There are only support two types: **number** and **tel** 

#### autofocus
#### disabled
#### maxlength
#### name
#### placeholder
#### readonly
#### value
#### keyboard
The keyboard options will be used by keyboard.

### events

#### input
The `input` event is emit when the value of input changes

## License

Licensed under the MIT license

