import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, AfterViewInit, AfterViewChecked,
  ElementRef, ApplicationRef, ComponentFactoryResolver, Injector, EmbeddedViewRef } from '@angular/core'
import { coerceBooleanProperty } from 'lib/utils/attribute.js'
import { Options, Mixins } from 'lib/input'
import { NumericKeyboard } from '../keyboard/keyboard.component'

const template = `
<div class="numeric-input" [class.readonly]="kp.readonly" [class.disabled]="kp.disabled" (touchend)="onFocus($event)">
  <div>
    <div class="numeric-input-text"><span *ngFor="let c of ks.rawValue; let i = index; trackBy: trackByIndex" [attr.data-index]="i">{{c}}</span></div>
    <div *ngIf="ks.rawValue.length === 0" class="numeric-input-placeholder">{{kp.placeholder}}</div>
    <div *ngIf="ks.cursorActive" class="numeric-input-cursor" [style.background]="ks.cursorColor"></div>
  </div>
</div>
`

class Parent {}
Parent.prototype = Mixins
Parent.prototype.constructor = Parent

@Component({
  selector: 'numeric-input',
  template: template,
  styleUrls: [ './input.component.styl' ]
})
export class NumericInput extends Parent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  private _autofocus: boolean = Options.autofocus
  private _disabled: boolean = Options.disabled
  private _readonly: boolean = Options.readonly
  private _value: number | string = Options.value

  @Input()
  get autofocus() { return this._autofocus }
  set autofocus(value: any) { this._autofocus = coerceBooleanProperty(value) }

  @Input()
  get disabled() { return this._disabled }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value) }

  @Input()
  get readonly() { return this._readonly }
  set readonly(value: any) { this._readonly = coerceBooleanProperty(value) }

  @Input()
  get ngModel() { return this._value }
  set ngModel(value: any) {
    if (this.ks && this.ks.value !== value) {
      const rawValue = value.toString().split('')
      const cursorPos = rawValue.length
      Mixins.set.call(this, 'rawValue', rawValue)
      Mixins.set.call(this, 'cursorPos', cursorPos)
    }
    this._value = value
  }

  @Input() type: string = Options.type
  @Input() value: number | string = Options.value
  @Input() maxlength: number = Options.maxlength
  @Input() name: string = Options.name
  @Input() placeholder: string = Options.placeholder
  @Input() format: string | { (val: string): boolean } = Options.format
  @Input() layout: string | { key: number | string }[][] = Options.layout
  @Input() entertext: string = Options.entertext

  @Output() focus = new EventEmitter()
  @Output() blur = new EventEmitter()
  @Output() enterpress = new EventEmitter()
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
  }

  ngOnDestroy() {
    Mixins.destroy.call(this)
  }

  ngAfterViewInit() {
    Mixins.onMounted.call(this, this.element.nativeElement.querySelector('.numeric-input'))
  }

  ngAfterViewChecked() {
    Mixins.onUpdated.call(this)
  }

  trackByIndex(index) {
    return index
  }

  onFocus(event) {
    Mixins.onFocus.call(this, event)
  }

  dispatch(event: string, payload?: number | string) {
    switch (event) {
      case 'focus':
        this.focus.emit()
        break
      case 'blur':
        this.blur.emit()
        break
      case 'enterpress':
        this.enterpress.emit()
        break
      case 'input':
        this.ngModelChange.emit(payload)
        break
    }
  }

  createKeyboard(el, options, events, callback) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(NumericKeyboard)
      .create(this.injector)

    Object.assign(componentRef.instance, options)

    componentRef.instance.ngOnInit()

    for (let event in events) {
      componentRef.instance[event].subscribe(events[event])
    }

    this.appRef.attachView(componentRef.hostView)
    el.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement)

    callback(componentRef)
  }

  destroyKeyboard(el, keyboard) {
    keyboard.destroy()
    this.appRef.detachView(keyboard.hostView)
  }
}
