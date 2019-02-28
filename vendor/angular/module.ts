import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NumericKeyboard } from './keyboard/keyboard.component'
import { NumericInput } from './input/input.component'

@NgModule({
  declarations: [ NumericKeyboard, NumericInput ],
  entryComponents: [ NumericKeyboard ],
  imports: [ CommonModule ],
  exports: [ NumericKeyboard, NumericInput ]
})
export class NumericKeyboardModule {}
