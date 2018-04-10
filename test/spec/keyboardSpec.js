import { Key, Mixins } from 'lib/keyboard'

describe('Key class', () => {
  it('init with a key which will be exposed by a gettter called code', () => {
    let k0 = new Key(0)
    expect(k0.code).toBe(0)
    let kEsc = new Key('esc')
    expect(kEsc.code).toBe('esc')
  })

  it('add a label to overwrite the display text which is value of code default', () => {
    let k = new Key(0)
    expect(k.icon).toBe(0)
    let kLabel = new Key(0)
    kLabel.addLabel('zero')
    expect(kLabel.icon).toBe('zero')
  })

  it('the key may have a set of css style', () => {
    let k = new Key(1)
    expect(k.style).toBeNull()
    k.addStyle({
      color: 'red',
      fontSize: '12px'
    })
    expect(k.style).toEqual({
      color: 'red',
      fontSize: '12px'
    })
  })

  it('the element rendering the key may have different style while active', () => {
    let fackElement = { style: {} }
    let k = new Key(1)
    k.addStyle({
      color: ['white', 'black']
    })
    k.active(fackElement)
    expect(fackElement.style.color).toBe('black')
    k.deactive(fackElement)
    expect(fackElement.style.color).toBe('white')
  })
})

describe('keyboard mixins', () => {
  it('a dispatch method is required to dispatch a custom event', () => {
    expect(Mixins.dispatch).toThrowError()
  })
})
