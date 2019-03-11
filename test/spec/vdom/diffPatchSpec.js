import { VNode, diffAndPatch } from 'lib/utils/vdom.js'

describe('diff and patch', () => {

  it('props', () => {
    const oldTree = new VNode('div', { id: 'foo', className: 'bar' })
    const element = oldTree.render()

    expect(element.getAttribute('id')).toBe('foo')
    expect(element.getAttribute('class')).toBe('bar')

    const newTree = new VNode('div', { className: 'qux' })
    diffAndPatch(element, oldTree, newTree)

    expect(element.getAttribute('id')).toBeNull()
    expect(element.getAttribute('class')).toBe('qux')
  })

})
