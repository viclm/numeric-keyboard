import { toString } from './string.js'
import { isPlainObject, isEmptyObject } from './type.js'

const REventProperty = /^on(?=[A-Z])/

const HTMLAttrFix = {
  className: 'class',
  htmlFor: 'for'
}

const PatchType = {
  INSERT: 'insert',
  PROPS: 'props',
  REMOVE: 'remove',
  REORDER: 'reorder',
  REPLACE: 'replace'
}

class VText {
  constructor(text) {
    this.text = text
  }

  destroy() {
  }

  key(index) {
    this.key = this.text || index
  }

  render() {
    return document.createTextNode(this.text)
  }

  update() {
  }

  transition() {
  }
}

class VNode {
  constructor(tagName, props, ...children) {
    this.tagName = tagName
    this.props = props || {}
    this.children = this.resolveChildren(children)

    this._element = null
    this._events = {}
  }

  destroy() {
    for (let event in this._events) {
      let handlers = this._events[event]
      for (let i = 0 ; i < handlers.length ; i++) {
        this._element.removeEventListener(event, handlers[i])
      }
      delete this._events[event]
    }
  }

  key(index) {
    this.key = this.props['key'] || index
  }

  resolveProps(props) {
    let attributes = {}
    let styles = {}
    let events = {}
    for (let name in props) {
      if (REventProperty.test(name)) {
        events[name.slice(2).toLowerCase()] = props[name]
      }
      else if (name === 'style') {
        styles = props[name]
      }
      else {
        attributes[HTMLAttrFix[name] || name] = props[name]
      }
    }
    return { attributes, styles, events }
  }

  resolveChildren(children) {
    const resolvedChildren = []
    for (let i = 0 ; i < children.length ; i++) {
      let child = children[i]
      if (!child) { continue }
      if (Array.isArray(child)) {
        child.unshift(1)
        child.unshift(i)
        Array.prototype.splice.apply(children, child)
        i--
      }
      else {
        if (Object(child) !== child) {
          child = new VText(child)
        }
        child.key(i)
        resolvedChildren.push(child)
      }
    }
    return resolvedChildren
  }

  addEvent(event, handler) {
    const handlers = this._events[event] || []
    if (handler == null) {
      for (let i = 0 ; i < handlers.length ; i++) {
        this._element.removeEventListener(event, handlers[i])
      }
      delete this._events[event]
    }
    else {
      this._element.addEventListener(event, handler, false)
      this._events[event] = handlers.concat(handler)
    }
  }

  render() {
    const { attributes, styles, events } = this.resolveProps(this.props)
    const element = this._element = document.createElement(this.tagName)
    for (let name in attributes) {
      attributes[name] != null && element.setAttribute(name, toString(attributes[name]))
    }
    for (let name in styles) {
      element.style[name] = styles[name]
    }
    for (let name in events) {
      this.addEvent(name, events[name])
    }
    for (let i = 0 ; i < this.children.length ; i++) {
      element.appendChild(this.children[i].render())
    }
    return element
  }

  update(props) {
    const { attributes, styles, events } = this.resolveProps(props)
    for (let name in attributes) {
      let value = attributes[name]
      if (value == null) {
        this._element.removeAttribute(name)
      }
      else {
        this._element.setAttribute(name, toString(value))
      }
    }
    for (let name in styles) {
      this._element.style[name] = styles[name]
    }
    for (let name in events) {
      this.addEvent(name, events[name])
    }
  }

  transition(vnode) {
    vnode._element = this._element
  }

}

class VComponent {
  constructor(component, props = {}) {
    this.component = component
    this.props = props

    this._component = null
  }

  destroy() {
    this._component.destroy()
  }

  key(index) {
    this.key = this.props['key'] || index
  }

  render() {
    const component = this._component = new this.component(this.props)
    component.mount()
    return component._element
  }

  update(props) {
    this._component.setProps(props)
  }

  transition(vcomponent) {
    vcomponent._component = this._component
  }
}

class Diff {

  constructor(a, b) {
    this.index = -1
    this.patches = {}
    this.walk(a, b)
  }

  walk(a, b) {
    if (!a || !b) { return }

    const patch = [], index = ++this.index

    try {

      if (a.constructor !== b.constructor) {
        patch.push({ type: PatchType.REPLACE, oldNode: a, newNode: b })
        return
      }

      if (a.constructor === VText) {
        if (a.text !== b.text) {
          patch.push({ type: PatchType.REPLACE, oldNode: a, newNode: b })
        }
        return
      }

      if (a.constructor === VNode) {
        if (a.tagName !== b.tagName) {
          patch.push({ type: PatchType.REPLACE, oldNode: a, newNode: b })
          return
        }

        const diffProps = this.diffProps(a.props, b.props)
        if (diffProps) {
          patch.push({ type: PatchType.PROPS, props: diffProps, oldNode: a, newNode: b })
        }

        const diffChildren = this.diffChildren(a.children, b.children)
        if (diffChildren.move.length) {
          patch.push({ type: PatchType.REORDER, move: diffChildren.move })
        }

        for (let i = 0 ; i < b.children.length ; i++) {
          this.walk(diffChildren.children[i], b.children[i])
        }

        return
      }

      if (a.constructor === VComponent) {
        if (a.component !== b.component) {
          patch.push({ type: PatchType.REPLACE, oldNode: a, newNode: b })
          return
        }

        const diffProps = this.diffProps(a.props, b.props)
        if (diffProps) {
          patch.push({type: PatchType.PROPS, props: diffProps, oldNode: a, newNode: b})
        }
      }

    }
    catch (e) { throw e }
    finally {
      if (patch.length) { this.patches[index] = patch }
    }

  }

  diffProps(oldProps, newProps) {
    const diffProps = {}

    for (let name in oldProps) {
      let oldValue = oldProps[name]
      let newValue = newProps[name]

      if (!(name in newProps)) {
        diffProps[name] = null
      }
      else if (isPlainObject(oldValue) && isPlainObject(newValue)) {
        const dp = this.diffProps(oldValue, newValue)
        if (dp) {
          diffProps[name] = newValue
        }
      }
      else if (typeof oldValue === 'function' && typeof newValue === 'function') {
        if (oldValue !== newValue && oldValue.toString() !== newValue.toString()) {
          diffProps[name] = newValue
        }
      }
      else if (oldValue !== newValue) {
        diffProps[name] = newValue
      }
    }

    for (let name in newProps) {
      if (!(name in oldProps)) {
        diffProps[name] = newProps[name]
      }
    }

    return !isEmptyObject(diffProps) && diffProps
  }

  diffChildren(oldChildren, newChildren) {
    function getIndex(list) {
      const hash = {}
      for (let i = 0 ; i < list.length ; i++) {
        hash[list[i].key] = i
      }
      return hash
    }
    const oldIndex = getIndex(oldChildren)
    const newIndex = getIndex(newChildren)

    const transChildren = [], children = [], move = []

    for (let i = 0 ; i < oldChildren.length ; i++) {
      let node = oldChildren[i]
      if (newIndex[node.key] > -1) {
        transChildren.push(newChildren[newIndex[node.key]])
      }
      else {
        move.push({ type: PatchType.REMOVE, node, index: i })
      }
    }

    let i = 0, j = 0

    for (; i < newChildren.length ; i++) {
      let node = newChildren[i]
      if (transChildren[j] && transChildren[j].key === node.key) {
        children[i] = oldChildren[oldIndex[node.key]]
        j++
      }
      else {
        move.push({ type: PatchType.INSERT, node, index: i })
      }
    }

    while (transChildren[j]) {
      move.push({ type: PatchType.REMOVE, node: transChildren[j], index: i })
      j++
    }

    return { move, children }
  }
}

class Patch {
  constructor(node, patches) {
    this.root = node
    this.patches = patches
    this.patchesRemaining = Object.keys(patches).length
    this.index = -1
    this.walk(node)
  }

  walk(node) {
    var index = ++this.index
    var patch = this.patches[index]
    if (patch) {
      this.applyPatch(node, patch)
      this.patchesRemaining--
    }

    if (this.patchesRemaining > 0 && (this.root === node || node.nodeType === 1 && !node.__component)) {
      const childNodes = node.childNodes
      for (let i = 0 ; i < childNodes.length ; i++) {
        if (this.walk(childNodes[i])) { break }
      }
    }

    return this.patchesRemaining === 0
  }

  applyPatch(node, patches) {
    for (let i = 0 ; i < patches.length ; i++) {
      let patch = patches[i]
      switch (patch.type) {
        case PatchType.PROPS:
          this.patchProps(node, patch)
          break
        case PatchType.REPLACE:
          this.patchReplace(node, patch)
          break
        case PatchType.REORDER:
          this.patchReorder(node, patch)
          break
      }
    }
  }

  patchProps(node, patch) {
    patch.oldNode.transition(patch.newNode)
    patch.oldNode.update(patch.props)
  }

  patchReplace(node, patch) {
    patch.oldNode.destroy()
    node.parentNode.replaceChild(patch.newNode.render(), node)
  }

  patchReorder(node, patch) {
    const childNodes = node.childNodes
    const move = patch.move
    const domActions = []

    for (let i = 0 ; i < move.length ; i++) {
      let patch = move[i]
      // if (patch.type === PatchType.REMOVE) {
      //   patch.node.destroy()
      //   domActions.push({ method: 'removeChild', args: [childNodes[patch.index]] })
      // }
      // else if (patch.type === PatchType.INSERT) {
      //   domActions.push({ method: 'insertBefore', args: [patch.node.render(), childNodes[patch.index]] })
      // }
      if (patch.type === PatchType.REMOVE) {
        patch.node.destroy()
        node.removeChild(childNodes[patch.index])
      }
      else if (patch.type === PatchType.INSERT) {
        node.insertBefore(patch.node.render(), node.childNodes[patch.index])
      }
    }

    for (let i = 0 ; i < domActions.length ; i++) {
      node[domActions[i].method].apply(node, domActions[i].args)
    }
  }
}


function createElement(type, props, ...children) {
  if (typeof type === 'string') {
    return new VNode(type, props, ...children)
  }
  else if (Object.getPrototypeOf(type) === Component) {
    return new VComponent(type, props)
  }
  else {
    return new VText(type)
  }
}

function diffAndPatch(element, oldTree, newTree) {
  const patches = new Diff(oldTree, newTree).patches
  new Patch(element, patches)
}

class Component {
  constructor(props) {
    this.props = Object.assign({}, this.constructor.defaultProps, props)
    this.state = {}

    this._events = {}
    this._vtree = null
    this._element = null
    this._renderTimer = null
  }

  destroy() {
  }

  mount(selector) {
    function renderDOM(vtree) {
      const element = vtree.render()
      if (vtree.children) {
        for (let i = 0 ; i < vtree.children.length ; i++) {
          renderDOM(vtree.children[i])
        }
      }
      return element
    }

    this._vtree = this.render()
    this._element = renderDOM(this._vtree)
    this._element.component = 'component'

    if (selector) {
      const element = document.querySelector(selector)
      element.parentNode.replaceChild(this._element, element)
    }

    this.mounted(this._element)
  }

  mounted() {
  }

  setProps(props) {
    Object.assign(this.props, props)

    diffAndPatch(this._element, this._vtree, this._vtree = this.render())

    this.updated()
  }

  setState(state) {
    Object.assign(this.state, state)

    if (this._renderTimer) { return }

    this._renderTimer = setTimeout(() => {
      diffAndPatch(this._element, this._vtree, this._vtree = this.render())
      this._renderTimer = null
      this.updated()
    }, 100)
  }

  updated() {
  }

  render() {
    return createElement(new VText(''))
  }
}


export { createElement, diffAndPatch, Component, VText, VNode, VComponent, Diff, Patch, PatchType }
