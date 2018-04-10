import { Options, Mixins } from 'lib/input'

describe('input mixins', () => {

  const createComponent = (options) => {
    let componnet = Object.create(Mixins)
    componnet.dispatch = jasmine.createSpy()
    componnet.init(Object.assign(Options, options))
    return componnet
  }

  it('init', () => {
    let componnet = createComponent()
    expect(componnet.kp).not.toBeUndefined()
    expect(componnet.ks).not.toBeUndefined()
    for (let key in Options) {
      if (key === 'format') {
        expect(componnet.kp.format).toEqual(jasmine.any(Function))
        expect(componnet.kp.format).not.toEqual(Options.format)
      }
      else {
        expect(componnet.kp[key]).toBe(Options[key])
      }
    }
  })

  it('input number', () => {
    let componnet = createComponent({type: 'number'})

    expect(componnet.ks.rawValue).toEqual([])
    expect(componnet.ks.cursorPos).toBe(0)

    componnet.input(0)
    expect(componnet.ks.rawValue).toEqual([0])
    expect(componnet.ks.cursorPos).toBe(1)
    expect(componnet.dispatch).toHaveBeenCalledWith('input', 0)
    expect(componnet.dispatch).toHaveBeenCalledTimes(1)

    componnet.input(1)
    expect(componnet.ks.rawValue).toEqual([0, 1])
    expect(componnet.ks.cursorPos).toBe(2)
    expect(componnet.dispatch).toHaveBeenCalledWith('input', 1)
    expect(componnet.dispatch).toHaveBeenCalledTimes(2)

    componnet.input(2)
    expect(componnet.ks.rawValue).toEqual([0, 1, 2])
    expect(componnet.ks.cursorPos).toBe(3)
    expect(componnet.dispatch).toHaveBeenCalledWith('input', 12)
    expect(componnet.dispatch).toHaveBeenCalledTimes(3)

    componnet.input('del')
    expect(componnet.ks.rawValue).toEqual([0, 1])
    expect(componnet.ks.cursorPos).toBe(2)
    expect(componnet.dispatch).toHaveBeenCalledWith('input', 1)
    expect(componnet.dispatch).toHaveBeenCalledTimes(4)

  })

  it('input charactor', () => {
    let componnet = createComponent({type: 'tel'})

    expect(componnet.ks.rawValue).toEqual([])
    expect(componnet.ks.cursorPos).toBe(0)

    componnet.input(0)
    expect(componnet.ks.rawValue).toEqual([0])
    expect(componnet.ks.cursorPos).toBe(1)
    expect(componnet.dispatch).toHaveBeenCalledWith('input', '0')
    expect(componnet.dispatch).toHaveBeenCalledTimes(1)

    componnet.input(1)
    expect(componnet.ks.rawValue).toEqual([0, 1])
    expect(componnet.ks.cursorPos).toBe(2)
    expect(componnet.dispatch).toHaveBeenCalledWith('input', '01')
    expect(componnet.dispatch).toHaveBeenCalledTimes(2)

    componnet.input(2)
    expect(componnet.ks.rawValue).toEqual([0, 1, 2])
    expect(componnet.ks.cursorPos).toBe(3)
    expect(componnet.dispatch).toHaveBeenCalledWith('input', '012')
    expect(componnet.dispatch).toHaveBeenCalledTimes(3)

    componnet.input('del')
    expect(componnet.ks.rawValue).toEqual([0, 1])
    expect(componnet.ks.cursorPos).toBe(2)
    expect(componnet.dispatch).toHaveBeenCalledWith('input', '01')
    expect(componnet.dispatch).toHaveBeenCalledTimes(4)
  })

  it('decimal point', () => {
    let componnet = createComponent({type: 'number'})

    componnet.input('.')
    expect(componnet.ks.rawValue).toEqual([0, '.'])
    expect(componnet.ks.cursorPos).toBe(2)
    expect(componnet.dispatch).toHaveBeenCalledWith('input', 0)
    expect(componnet.dispatch).toHaveBeenCalledTimes(2)

    componnet.input(1)
    expect(componnet.ks.rawValue).toEqual([0, '.', 1])
    expect(componnet.ks.cursorPos).toBe(3)
    expect(componnet.dispatch).toHaveBeenCalledWith('input', 0.1)
    expect(componnet.dispatch).toHaveBeenCalledTimes(3)

    componnet.input('.')
    expect(componnet.ks.rawValue).toEqual([0, '.', 1])
    expect(componnet.ks.cursorPos).toBe(3)
    expect(componnet.dispatch).toHaveBeenCalledTimes(3)


    componnet = createComponent({type: 'number'})

    componnet.input(0)
    componnet.input('.')
    expect(componnet.ks.rawValue).toEqual([0, '.'])
    expect(componnet.dispatch).toHaveBeenCalledWith('input', 0)


    componnet = createComponent({type: 'tel'})

    componnet.input('.')
    expect(componnet.ks.rawValue).toEqual(['.'])
    expect(componnet.dispatch).toHaveBeenCalledWith('input', '.')

  })

})
