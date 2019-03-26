import { VText, VNode } from 'lib/utils/vdom.js'

describe('vnode', () => {

  it('render', () => {
    const vnode = new VNode('div')
    const element = vnode.render()

    expect(element).toEqual(jasmine.any(HTMLDivElement))
  })

  it('render props', () => {
    const vnode = new VNode('div', { id: 'foo', htmlFor: 'bar', className: 'baz', qux: 'quux', obj: {} })
    const element = vnode.render()

    expect(element.getAttribute('id')).toBe('foo')
    expect(element.getAttribute('for')).toBe('bar')
    expect(element.getAttribute('class')).toBe('baz')
    expect(element.getAttribute('qux')).toBe('quux')
    expect(element.getAttribute('obj')).toBe('[object Object]')

    expect(element.getAttribute('htmlFor')).toBeNull()
    expect(element.getAttribute('className')).toBeNull()
  })

  it('render styles', () => {
    const vnode = new VNode('div', { style: { color: 'white', backgroundColor: 'black' } })
    const element = vnode.render()

    expect(element.style.color).toBe('white')
    expect(element.style.backgroundColor).toBe('black')
  })

  it('render events', () => {
    const start = jasmine.createSpy('touchstart')
    const end = jasmine.createSpy('touchend')

    const vnode = new VNode('div', { onTouchstart: start, ontouchend: end })
    const element = vnode.render()

    expect(element.getAttribute('onTouchstart')).toBeNull()
    expect(element.getAttribute('ontouchend')).toBe('[object Function]')

    expect(start).not.toHaveBeenCalled()

    element.dispatchEvent(new Event('touchstart'))
    // dispatch a touchend event will raise a exception as the unlegal code specified by the ontouchend property will run
    // element.dispatchEvent(new Event('touchend'))

    expect(start).toHaveBeenCalledTimes(1)
  })

  it('render single child', () => {
    const vnode = new VNode('div', null, new VNode('span'))
    const element = vnode.render()

    expect(element.childNodes.length).toBe(1)
    expect(element.firstChild).toEqual(jasmine.any(HTMLSpanElement))
  })

  it('render children', () => {
    const vnode = new VNode('div', null, 'foo', new VNode('span', null, new VText('bar'), 1))
    const element = vnode.render()

    expect(element.childNodes.length).toBe(2)
    expect(element.firstChild).toEqual(jasmine.any(Text))
    expect(element.lastChild).toEqual(jasmine.any(HTMLSpanElement))
    expect(element.lastChild.firstChild.nodeValue).toBe('bar')
    expect(element.lastChild.lastChild.nodeValue).toBe('1')
    expect(element.lastChild.innerHTML).toBe('bar1')
  })

  it('update', function () {
    const start = jasmine.createSpy('touchstart')
    const end = jasmine.createSpy('touchend')

    const vnode = new VNode('div', { id: 'foo', style: { color: 'white' }, onTouchstart: start })
    const updateProps = { id: null, className: 'bar', style: { color: null, backgroundColor: 'black' }, onTouchstart: null, onTouchend: end }

    const element = vnode.render()
    vnode.update(updateProps)

    expect(element.getAttribute('id')).toBeNull()
    expect(element.getAttribute('class')).toBe('bar')
    expect(element.style.color).toBe('')
    expect(element.style.backgroundColor).toBe('black')

    element.dispatchEvent(new Event('touchstart'))
    element.dispatchEvent(new Event('touchend'))

    expect(start).toHaveBeenCalledTimes(0)
    expect(end).toHaveBeenCalledTimes(1)
  })

})
