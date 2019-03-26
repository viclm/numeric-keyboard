import { VNode, Diff, Patch } from 'lib/utils/vdom.js'

describe('patch', () => {

  it('props', () => {
    const oldTree = new VNode('div', { id: 'foo', className: 'bar' })
    const element = oldTree.render()

    expect(element.getAttribute('id')).toBe('foo')
    expect(element.getAttribute('class')).toBe('bar')

    const newTree = new VNode('div', { className: 'qux' })
    const diffs = new Diff(oldTree, newTree).patches
    new Patch(element, diffs)

    expect(element.getAttribute('id')).toBeNull()
    expect(element.getAttribute('class')).toBe('qux')
  })

  it('styles', () => {
    const oldTree = new VNode('div', { style: { color: 'white' } })
    const element = oldTree.render()

    expect(element.style.color).toBe('white')

    const newTree = new VNode('div', { style: { color: null, backgroundColor: 'black' } })
    const diffs = new Diff(oldTree, newTree).patches
    new Patch(element, diffs)

    expect(element.style.color).toBe('')
    expect(element.style.backgroundColor).toBe('black')
  })

  it('events', () => {
    const start = jasmine.createSpy('touchstart')
    const end = jasmine.createSpy('touchend')
    const move = jasmine.createSpy('touchmove')

    const oldTree = new VNode('div', { onTouchstart: start, onTouchend: end })
    const element = oldTree.render()

    element.dispatchEvent(new Event('touchstart'))
    element.dispatchEvent(new Event('touchend'))
    element.dispatchEvent(new Event('touchmove'))

    expect(start).toHaveBeenCalledTimes(1)
    expect(end).toHaveBeenCalledTimes(1)
    expect(move).not.toHaveBeenCalled()

    const newTree = new VNode('div', { onTouchmove: move })
    const diffs = new Diff(oldTree, newTree).patches
    new Patch(element, diffs)

    element.dispatchEvent(new Event('touchstart'))
    element.dispatchEvent(new Event('touchend'))
    element.dispatchEvent(new Event('touchmove'))

    expect(start).toHaveBeenCalledTimes(1)
    expect(end).toHaveBeenCalledTimes(1)
    expect(move).toHaveBeenCalledTimes(1)
  })

  it('replace text', () => {
    const oldTree = new VNode('div', null, 'foo')
    const element = oldTree.render()

    expect(element.firstChild.nodeValue).toBe('foo')

    const newTree = new VNode('div', null, 'bar')
    const diffs = new Diff(oldTree, newTree).patches
    new Patch(element, diffs)

    expect(element.firstChild.nodeValue).toBe('bar')
  })

  it('replace node', () => {
    const oldTree = new VNode('div', null, new VNode('div'))
    const element = oldTree.render()

    expect(element.firstChild).toEqual(jasmine.any(HTMLDivElement))

    const newTree = new VNode('div', null, new VNode('span'))
    const diffs = new Diff(oldTree, newTree).patches
    new Patch(element, diffs)

    expect(element.firstChild).toEqual(jasmine.any(HTMLSpanElement))
  })

  it('reorder', () => {
    const oldTree = new VNode('div', null, new VNode('span', {id: 'foo'}), new VNode('span', {id: 'bar'}))
    const element = oldTree.render()

    expect(element.firstChild.getAttribute('id')).toBe('foo')
    expect(element.lastChild.getAttribute('id')).toBe('bar')

    const newTree = new VNode('div', null, new VNode('span', {id: 'bar'}), new VNode('span', {id: 'foo'}))
    const diffs = new Diff(oldTree, newTree).patches
    new Patch(element, diffs)

    expect(element.firstChild.getAttribute('id')).toBe('bar')
    expect(element.lastChild.getAttribute('id')).toBe('foo')
  })

  it('reorder with key', () => {
    const oldTree = new VNode('div', null, new VNode('span', {id: 'foo', key: 'foo'}), new VNode('span', {id: 'bar', key: 'bar'}))
    const element = oldTree.render()

    expect(element.firstChild.getAttribute('id')).toBe('foo')
    expect(element.lastChild.getAttribute('id')).toBe('bar')

    const newTree = new VNode('div', null, new VNode('span', {id: 'bar', key: 'bar'}), new VNode('span', {id: 'foo', key: 'foo'}))
    const diffs = new Diff(oldTree, newTree).patches
    new Patch(element, diffs)

    expect(element.firstChild.getAttribute('id')).toBe('bar')
    expect(element.lastChild.getAttribute('id')).toBe('foo')
  })

})
