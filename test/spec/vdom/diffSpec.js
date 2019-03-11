import { Component, VText, VNode, VComponent, Diff, PatchType } from 'lib/utils/vdom.js'

describe('diff', () => {

  it('vtext and vtext, same', () => {
    const oldNode = new VText('foo')
    const newNode = new VText('foo')
    const diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toBeUndefined()
  })

  it('vtext and vtext, different', () => {
    const oldNode = new VText('foo')
    const newNode = new VText('bar')
    const diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.REPLACE, oldNode, newNode}])
  })

  it('vnode vs vnode, same', () => {
    const oldNode = new VNode('div')
    const newNode = new VNode('div')
    const diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toBeUndefined()
  })

  it('vnode vs vnode, different tagName', () => {
    const oldNode = new VNode('div')
    const newNode = new VNode('span')
    const diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.REPLACE, oldNode, newNode}])
  })

  it('vnode vs vnode, different props', () => {
    let oldNode, newNode, diffs

    oldNode = new VNode('div')
    newNode = new VNode('div', {classname: 'bar'})
    diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.PROPS, oldNode, newNode, props: {classname: 'bar'}}])

    oldNode = new VNode('div', {classname: 'bar'})
    newNode = new VNode('div')
    diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.PROPS, oldNode, newNode, props: {classname: null}}])

    oldNode = new VNode('div', {classname: 'bar'})
    newNode = new VNode('div', {classname: 'foo'})
    diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.PROPS, oldNode, newNode, props: {classname: 'foo'}}])

    oldNode = new VNode('div', {classname: 'bar'})
    newNode = new VNode('div', {classname: 'foo', id: 'qux'})
    diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.PROPS, oldNode, newNode, props: {classname: 'foo', id: 'qux'}}])

    oldNode = new VNode('div', { style: { color: 'white' } })
    newNode = new VNode('div', { style: { color: null, backgroundColor: 'black' } })
    diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.PROPS, oldNode, newNode, props: { style: { color: null, backgroundColor: 'black' } }}])
  })

  it('vnode vs vnode, different children', () => {
    let oldNode, newNode, diffs

    oldNode = new VNode('div')
    newNode = new VNode('div', null, 'foo')
    diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.REORDER, move: [{type: PatchType.INSERT, node: jasmine.any(VText), index: 0}]}])

    oldNode = new VNode('div', null, 'foo')
    newNode = new VNode('div')
    diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.REORDER, move: [{type: PatchType.REMOVE, node: jasmine.any(VText), index: 0}]}])

    oldNode = new VNode('div', null, 'foo')
    newNode = new VNode('div', null, 'bar')
    diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0][0].type).toBe(PatchType.REORDER)
    expect(diffs[0][0].move.length).toBe(2)
    expect(diffs[0][0].move[0]).toEqual({type: PatchType.REMOVE, node: jasmine.any(VText), index: 0})
    expect(diffs[0][0].move[1]).toEqual({type: PatchType.INSERT, node: jasmine.any(VText), index: 0})

    oldNode = new VNode('div', null, new VNode('span', {key: 'foo'}), new VNode('span', {key: 'bar'}))
    newNode = new VNode('div', null, new VNode('span', {key: 'bar'}), new VNode('span', {key: 'foo'}))
    diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0][0].type).toBe(PatchType.REORDER)
    expect(diffs[0][0].move.length).toBe(2)
    expect(diffs[0][0].move[0]).toEqual({type: PatchType.INSERT, node: jasmine.any(VNode), index: 0})
    expect(diffs[0][0].move[1]).toEqual({type: PatchType.REMOVE, node: jasmine.any(VNode), index: 2})
  })

  it('vcomponent and vcomponent, same', () => {
    class C extends Component {}
    const oldNode = new VComponent(C)
    const newNode = new VComponent(C)
    const diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toBeUndefined()
  })

  it('vcomponent vs vcomponent, different class', function () {
    class C1 extends Component {}
    class C2 extends Component {}
    const oldNode = new VComponent(C1)
    const newNode = new VComponent(C2)
    const diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.REPLACE, oldNode, newNode}])
  })

  it('vcomponent vs vcomponent, different props', function () {
    class C extends Component {}
    const oldNode = new VComponent(C, {foo: 'foo'})
    const newNode = new VComponent(C, {bar: 'bar'})
    const diffs = new Diff(oldNode, newNode).patches

    expect(diffs[0]).toEqual([{type: PatchType.PROPS, oldNode, newNode, props: {foo: null, bar: 'bar'}}])
  })

  it('vtext vs vnode vs vcomponent', function () {
    const vtext = new VText('foo')
    const vnode = new VNode('div')
    const vcomponent = new VComponent(class C extends Component {})

    const diffsTN = new Diff(vtext, vnode).patches
    const diffsTC = new Diff(vtext, vcomponent).patches
    const diffsNC = new Diff(vnode, vcomponent).patches

    expect(diffsTN[0]).toEqual([{type: PatchType.REPLACE, oldNode: vtext, newNode: vnode}])
    expect(diffsTC[0]).toEqual([{type: PatchType.REPLACE, oldNode: vtext, newNode: vcomponent}])
    expect(diffsNC[0]).toEqual([{type: PatchType.REPLACE, oldNode: vnode, newNode: vcomponent}])
  })


})
