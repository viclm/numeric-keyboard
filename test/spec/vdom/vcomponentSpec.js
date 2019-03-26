import { VComponent, Component, createElement } from 'lib/utils/vdom.js'

describe('vcomponet', () => {

  it('render', () => {
    class C extends Component {
      render() {
        return createElement('div', { id: this.props.id })
      }
    }

    const vcomponent = new VComponent(C, { id: 'foo' })
    const element = vcomponent.render()

    expect(element).toEqual(jasmine.any(HTMLDivElement))
    expect(element.getAttribute('id')).toBe('foo')
  })

  it('render - with events', () => {
    class C extends Component {
      onTouchend() {
        this.props.onTouchend.call()
      }

      render() {
        return createElement('div', { onTouchend: this.onTouchend.bind(this) })
      }
    }

    const touchendHandler = jasmine.createSpy()
    const vcomponent = new VComponent(C, { onTouchend: touchendHandler })
    const element = vcomponent.render()

    expect(touchendHandler).not.toHaveBeenCalled()

    element.dispatchEvent(new Event('touchend'))

    expect(touchendHandler).toHaveBeenCalledTimes(1)
  })

  it('update', () => {
    class C extends Component {
      render() {
        return createElement('section', { id: this.props.id })
      }
    }

    const vcomponent = new VComponent(C, { id: 'foo' })
    const element = vcomponent.render()

    expect(element.getAttribute('id')).toBe('foo')

    vcomponent.update({ id: 'bar' })

    expect(element.getAttribute('id')).toBe('bar')

    vcomponent.update({ id: 'qux' })

    expect(element.getAttribute('id')).toBe('qux')
  })

})
