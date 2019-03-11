import { createElement, VText, VNode, VComponent, Component } from 'lib/utils/vdom.js'

describe('createElement', () => {

  // @TODO add tag validation
  xit('vtext', () => {
    const vtree = createElement('foo')

    expect(vtree).toEqual(jasmine.any(VText))
  })

  it('vnode', () => {
    const vtree = createElement('div')

    expect(vtree).toEqual(jasmine.any(VNode))
  })

  it('vnode with props and children', () => {
    const vtree = createElement('div', { id: 'foo' }, 'bar', createElement('span'))

    expect(vtree.props.id).toBe('foo')
    expect(vtree.children).toEqual([jasmine.any(VText), jasmine.any(VNode)])
  })

  it('vcomponent', () => {
    class C extends Component {}
    const vtree = createElement(C)

    expect(vtree).toEqual(jasmine.any(VComponent))
  })

})
