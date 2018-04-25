import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NumericKeyboard } from './keyboard/keyboard.component'

@NgModule({
  declarations: [ NumericKeyboard ],
  imports: [ CommonModule ],
  exports: [ NumericKeyboard ]
})
export class NumericKeyboardModule { }
