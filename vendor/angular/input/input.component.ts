import { Component, EventEmitter, Input, Output, OnInit, OnDestroy,
  ElementRef, ApplicationRef, ComponentFactoryResolver, Injector, EmbeddedViewRef } from '@angular/core'
import { Options, Mixins } from 'lib/input'
import { NumericKeyboard } from '../keyboard/keyboard.component'

const template = `
<div class="numeric-input" [class.readonly]="kp.readonly" [class.disabled]="kp.disabled" (touchend)="handleFocus($event)">
  <input type="hidden" [attr.name]="kp.name" [value]="kp.ngModel" />
  <div *ngIf="ks">
    <div *ngIf="ks.rawValue.length === 0" class="numeric-input-placeholder">{{kp.placeholder}}</div>
    <div *ngIf="ks.rawValue.length > 0" class="numeric-input-text"><span *ngFor="let c of ks.rawValue; let i = index; trackBy: trackByIndex" [attr.data-index]="i">{{c}}</span></div>
    <div *ngIf="ks.cursorTimer" class="numeric-input-cursor" [style.background]="ks.cursorColor"></div>
  </div>
</div>
`

class Parent {}
Parent.prototype = Mixins

@Component({
  selector: 'numeric-input',
  template: template,
  styleUrls: [ '../../../lib/style/input.styl', './input.component.styl' ]
})
export class NumericInput extends Parent implements OnInit, OnDestroy {
  @Input() type: string = Options.type
  @Input() value: number | string = Options.value
  @Input() autofocus: boolean = Options.autofocus
  @Input() disabled: boolean = Options.disabled
  @Input() readonly: boolean = Options.readonly
  @Input() maxlength: number = Options.maxlength
  @Input() name: string = Options.name
  @Input() placeholder: string = Options.placeholder
  @Input() format: string | { (val: string): boolean } = Options.format
  @Input() layout: string | { key: number | string }[][] = Options.layout
  @Input() entertext: string = Options.entertext

  @Input() ngModel: number | string = Options.value

  @Output() onFocus = new EventEmitter()
  @Output() onBlur = new EventEmitter()
  @Output() onEnterpress = new EventEmitter()
  @Output() ngModelChange = new EventEmitter<number | string>()

  public kp
  public ks

  constructor(
    private element: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
    super()
  }

  ngOnInit() {
    let resolvedOptions = {}
    for (let key in Options) {
      resolvedOptions[key] = this[key]
    }
    Mixins.init.call(this, resolvedOptions)
    Mixins.onMounted.call(this, this.element.nativeElement.querySelector('.numeric-input'))
  }

  ngOnDestroy() {
    Mixins.destroy.call(this)
  }

  trackByIndex(index) {
    return index
  }

  handleFocus(event) {
    Mixins.onFocus.call(this, event)
  }

  moveCursor() {
    this.appRef.tick()
    Mixins.moveCursor.call(this)
  }

  dispatch(event: string, argument?: number | string) {
    switch (event) {
      case 'focus':
        this.onFocus.emit(argument)
        break
      case 'blur':
        this.onBlur.emit(argument)
        break
      case 'enterpress':
        this.onEnterpress.emit(argument)
        break
      case 'input':
        this.ngModelChange.emit(argument)
        break
    }
  }

  createKeyboard(el, options, events, callback) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(NumericKeyboard)
      .create(this.injector)

    Object.assign(componentRef.instance, options)

    componentRef.instance.ngOnInit()

    componentRef.instance.onPress.subscribe(callback)

    this.appRef.attachView(componentRef.hostView)

    el.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement)

    return componentRef
  }

  destroyKeyboard(keyboardClass) {
    keyboardClass.destroy()
    this.appRef.detachView(keyboardClass.hostView)
  }
}
