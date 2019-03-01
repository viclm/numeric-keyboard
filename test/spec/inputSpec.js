import { Options, Mixins } from 'lib/input.js'
import * as Keys from 'lib/keys.js'

describe('input mixins', () => {

  const createComponent = (options) => {
    const component = Object.create(Mixins)
    component.dispatch = jasmine.createSpy()
    component.init(Object.assign({}, Options, options))
    return component
  }

  it('built-in number charactor', () => {
    const component = createComponent({type: 'text'})

    expect(component.ks.rawValue).toEqual([])
    expect(component.ks.cursorPos).toBe(0)
    expect(component.dispatch).not.toHaveBeenCalled()

    ;[
      Keys.ZERO, Keys.ONE, Keys.TWO, Keys.THREE, Keys.FOUR,
      Keys.FIVE, Keys.SIX, Keys.SEVEN, Keys.EIGHT, Keys.NINE
    ].forEach((key, index) => {
      const rawValue = Array(index + 2).join('*').split('').map((n, i) => (i).toString())
      component.input(key)
      expect(component.ks.rawValue).toEqual(rawValue)
      expect(component.ks.cursorPos).toBe(index + 1)
      expect(component.dispatch).toHaveBeenCalledWith('input', rawValue.join(''))
    })

    expect(component.dispatch).toHaveBeenCalledWith('input', '0123456789')
    expect(component.dispatch).toHaveBeenCalledTimes(10)
  })

  it('built-in control charactor', () => {
    let component = createComponent({type: 'text'})

    // input event be triggered only when content changes
    component.input(Keys.BLANK)
    expect(component.ks.rawValue).toEqual([])
    expect(component.ks.cursorPos).toBe(0)
    expect(component.dispatch).not.toHaveBeenCalled()

    component.input(Keys.ESC)
    expect(component.ks.rawValue).toEqual([])
    expect(component.ks.cursorPos).toBe(0)
    expect(component.dispatch).not.toHaveBeenCalled()

    component.input(Keys.ENTER)
    expect(component.ks.rawValue).toEqual([])
    expect(component.ks.cursorPos).toBe(0)
    expect(component.dispatch).toHaveBeenCalledWith('enterpress')
    expect(component.dispatch).toHaveBeenCalledTimes(1)

    component.input(Keys.DOT)
    expect(component.ks.rawValue).toEqual(['.'])
    expect(component.ks.cursorPos).toBe(1)
    expect(component.dispatch).toHaveBeenCalledWith('input', '.')
    expect(component.dispatch).toHaveBeenCalledTimes(2)

    component.input(Keys.DEL)
    expect(component.ks.rawValue).toEqual([])
    expect(component.ks.cursorPos).toBe(0)
    expect(component.dispatch).toHaveBeenCalledWith('input', '')
    expect(component.dispatch).toHaveBeenCalledTimes(3)

    component.input(Keys.DEL)
    expect(component.ks.rawValue).toEqual([])
    expect(component.ks.cursorPos).toBe(0)
    expect(component.dispatch).toHaveBeenCalledWith('input', '')
    expect(component.dispatch).toHaveBeenCalledTimes(3)
  })

  it('custom charactor', () => {
    const component = createComponent({type: 'text'})

    component.input('0')
    expect(component.ks.rawValue).toEqual(['0'])
    expect(component.ks.cursorPos).toBe(1)
    expect(component.dispatch).toHaveBeenCalledWith('input', '0')
    expect(component.dispatch).toHaveBeenCalledTimes(1)

    component.input('X')
    expect(component.ks.rawValue).toEqual(['0', 'X'])
    expect(component.ks.cursorPos).toBe(2)
    expect(component.dispatch).toHaveBeenCalledWith('input', '0X')
    expect(component.dispatch).toHaveBeenCalledTimes(2)
  })

  it('input number', () => {
    let component = createComponent({type: 'number'})

    // leading zeros is legal, but is not octal
    component.input(Keys.ZERO)
    expect(component.ks.rawValue).toEqual(['0'])
    expect(component.ks.cursorPos).toBe(1)
    expect(component.dispatch).toHaveBeenCalledWith('input', 0)
    expect(component.dispatch).toHaveBeenCalledTimes(1)

    component.input(Keys.ONE)
    expect(component.ks.rawValue).toEqual(['0', '1'])
    expect(component.ks.cursorPos).toBe(2)
    expect(component.dispatch).toHaveBeenCalledWith('input', 1)
    expect(component.dispatch).toHaveBeenCalledTimes(2)

    component.input(Keys.TWO)
    expect(component.ks.rawValue).toEqual(['0', '1', '2'])
    expect(component.ks.cursorPos).toBe(3)
    expect(component.dispatch).toHaveBeenCalledWith('input', 12)
    expect(component.dispatch).toHaveBeenCalledTimes(3)

    component.input('X')
    expect(component.ks.rawValue).toEqual(['0', '1', '2'])
    expect(component.ks.cursorPos).toBe(3)
    expect(component.dispatch).toHaveBeenCalledWith('input', 12)
    expect(component.dispatch).toHaveBeenCalledTimes(3)
  })

  it('input number with decimal point', () => {
    let component = createComponent({type: 'number'})

    // double decimal point is a obvious mistake which should be blocked
    // leading decimal point is legal, so there is no need to padding zero
    component.input(Keys.DOT)
    expect(component.ks.rawValue).toEqual(['.'])
    expect(component.ks.cursorPos).toBe(1)
    expect(component.dispatch).toHaveBeenCalledTimes(1)

    component.input(Keys.ONE)
    expect(component.ks.rawValue).toEqual(['.', '1'])
    expect(component.ks.cursorPos).toBe(2)
    expect(component.dispatch).toHaveBeenCalledWith('input', 0.1)
    expect(component.dispatch).toHaveBeenCalledTimes(2)

    component.input(Keys.DOT)
    expect(component.ks.rawValue).toEqual(['.', '1'])
    expect(component.ks.cursorPos).toBe(2)
    expect(component.dispatch).toHaveBeenCalledTimes(2)
  })

  it('input tel', () => {
    let component = createComponent({type: 'tel'})

    component.input(Keys.DOT)
    expect(component.ks.rawValue).toEqual([])
    expect(component.ks.cursorPos).toBe(0)
    expect(component.dispatch).not.toHaveBeenCalled()

    component.input('X')
    expect(component.ks.rawValue).toEqual([])
    expect(component.ks.cursorPos).toBe(0)
    expect(component.dispatch).not.toHaveBeenCalled()

    component.input(Keys.ZERO)
    expect(component.ks.rawValue).toEqual(['0'])
    expect(component.ks.cursorPos).toBe(1)
    expect(component.dispatch).toHaveBeenCalledWith('input', '0')
    expect(component.dispatch).toHaveBeenCalledTimes(1)
  })

})
