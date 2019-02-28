import React from 'react'
import { capitalize } from 'lib/utils/string'
import { Options, Mixins } from 'lib/keyboard.js'
import { ENTER } from 'lib/keys.js'
import 'lib/styles/keyboard.styl'

class Parent extends React.Component {}
Object.assign(Parent.prototype, Mixins)

export class NumericKeyboard extends Parent {
  constructor(props) {
    super(props)
    this.init(props)
  }

  onTouchend(key, event) {
    super.onTouchend(key, event)
    event.nativeEvent.stopImmediatePropagation()
  }

  dispatch(event, payload) {
    const callback = this.props[`on${capitalize(event)}`]
    if (callback) {
      callback(payload)
    }
  }

  render() {
    return (
      <table className="numeric-keyboard">
        <tbody>
          {this.ks.resolvedLayout.map((r, i) =>
            <tr key={i}>
              {r.map(c =>
                <td
                  key={c.key}
                  rowSpan={c.rowspan}
                  colSpan={c.colspan}
                  data-key={c.key}
                  data-icon={c.key === ENTER ? this.kp.entertext : c.key}
                  className="numeric-keyboard-key"
                  onTouchEnd={e => this.onTouchend(c.key, e)} >
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

NumericKeyboard.defaultProps = Options
