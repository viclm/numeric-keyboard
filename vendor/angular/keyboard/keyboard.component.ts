import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core'
import { Options, Mixins } from 'lib/keyboard'
import { ENTER } from 'lib/keys.js'

const template = `
<table class="numeric-keyboard">
  <tr *ngFor="let r of ks.resolvedLayout">
    <td *ngFor="let c of r"
      [attr.rowspan]="c.rowspan"
      [attr.colspan]="c.colspan"
      [attr.data-key]="c.key"
      [attr.data-icon]="c.key === ENTER ? kp.entertext : c.key"
      class="numeric-keyboard-key"
      (touchend)="onTouchend(c.key, $event)">
    </td>
  </tr>
</table>
`

class Parent {}
Parent.prototype = Mixins

@Component({
  selector: 'numeric-keyboard',
  template: template,
  styleUrls: [ './keyboard.component.styl' ]
})
export class NumericKeyboard extends Parent implements OnInit, OnDestroy {
  @Input() layout: string | { key: number | string }[][] = Options.layout
  @Input() entertext: string = Options.entertext

  @Output() press = new EventEmitter<number | string>()
  @Output() enterpress = new EventEmitter()

  public kp: any
  public ks: any

  ngOnInit() {
    Mixins.init.call(this, {
      layout: this.layout,
      entertext: this.entertext
    })
  }

  ngOnDestroy() {
    Mixins.destroy.call(this)
  }

  dispatch(event: string, payload?: number | string) {
    switch (event) {
      case 'press':
        this.press.emit(payload)
        break
      case 'enterpress':
        this.enterpress.emit()
        break
    }
  }
}
