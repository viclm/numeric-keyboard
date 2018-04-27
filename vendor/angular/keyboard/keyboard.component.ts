import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core'
import { Options, Mixins } from 'lib/keyboard'

enum Event {
  Press = 'press'
}

const template = `
<div class="numeric-keyboard">
  <table>
    <tr *ngFor="let r of ks.layout">
      <td *ngFor="let c of r"
        [attr.rowspan]="c.rowspan"
        [attr.colspan]="c.colspan"
        [attr.data-icon]="ks.keys[c.key].icon"
        [ngStyle]="ks.keys[c.key].style"
        (touchstart)="onTouchstart(ks.keys[c.key], $event)"
        (touchend)="onTouchend(ks.keys[c.key], $event)">
      </td>
    </tr>
  </table>
</div>
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
  @Input() theme: string | { global?: any, key?: any } = Options.theme
  @Input() entertext: string = Options.entertext
  @Output() onPress = new EventEmitter<number | string>()

  public kp: any
  public ks: any

  ngOnInit() {
    Mixins.init.call(this, {
      layout: this.layout,
      theme: this.theme,
      entertext: this.entertext
    })
  }

  ngOnDestroy() {
    Mixins.destroy.call(this)
  }

  dispatch(event: Event, argument?: number | string) {
    switch (event) {
      case Event.Press:
        this.onPress.emit(argument)
        break
    }
  }
}
