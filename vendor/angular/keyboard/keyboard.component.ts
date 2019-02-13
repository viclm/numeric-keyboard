import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core'
import { Options, Mixins } from 'lib/keyboard'

const template = `
<table class="numeric-keyboard">
  <tr *ngFor="let r of ks.layout">
    <td *ngFor="let c of r"
      [attr.rowspan]="c.rowspan"
      [attr.colspan]="c.colspan"
      [attr.data-key]="ks.keys[c.key].key"
      [attr.data-icon]="ks.keys[c.key].icon"
      class="numeric-keyboard-key"
      (touchend)="onTouchend(ks.keys[c.key].key, $event)">
    </td>
  </tr>
</table>
`

class Parent {}
Parent.prototype = Mixins

@Component({
  selector: 'numeric-keyboard',
  template: template,
  styleUrls: [ '../../../lib/style/keyboard.styl', './keyboard.component.styl' ]
})
export class NumericKeyboard extends Parent implements OnInit, OnDestroy {
  @Input() layout: string | { key: number | string }[][] = Options.layout
  @Input() entertext: string = Options.entertext

  @Output() onPress = new EventEmitter<number | string>()
  @Output() onEnterpress = new EventEmitter()

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

  dispatch(event: string, argument?: number | string) {
    switch (event) {
      case 'press':
        this.onPress.emit(argument)
        break
      case 'enterpress':
        this.onEnterpress.emit(argument)
        break
    }
  }
}
