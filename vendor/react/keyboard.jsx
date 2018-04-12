import React from 'react'
import { Options, Mixins } from 'lib/keyboard'
import 'lib/style/keyboard.styl'

const rfirst = /^[a-z]/

class Parent extends React.Component {}
Object.assign(Parent.prototype, Mixins)

export default class Keyboard extends Parent {
  constructor(props) {
    super(props)
    this.init(props)
  }

  render() {
    const { layout, keys } = this.ks
    return <div className="numeric-keyboard">
      <table>
        <tbody>
          {layout.map((r, i) =>
            <tr key={i}>
              {r.map(c =>
                <td
                  key={c.key}
                  rowSpan={c.rowspan}
                  colSpan={c.colspan}
                  data-icon={keys[c.key].icon}
                  style={keys[c.key].style}
                  onTouchStart={e => this.onTouchstart(keys[c.key], e)}
                  onTouchEnd={e => this.onTouchend(keys[c.key], e)} >
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  }

  dispatch(event, ...args) {
    const callback = this.props[`on${event.replace(rfirst, s => s.toUpperCase())}`]
    if (callback) {
      callback(...args)
    }
  }

  onTouchend(key, event) {
    super.onTouchend(key, event)
    event.nativeEvent.stopImmediatePropagation()
  }
}

Keyboard.defaultProps = Options
