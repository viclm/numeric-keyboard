import { Component, createElement } from 'lib/utils/vdom.js'

describe('component', () => {

  it('mount() trigger first render', () => {
    class C extends Component {
      mounted() {}
      render() {
        return createElement('p')
      }
    }

    const c = new C

    spyOn(c, 'mounted')

    expect(c._element).toBeNull()
    expect(c.mounted).not.toHaveBeenCalled()

    c.mount()

    expect(c._element).toEqual(jasmine.any(HTMLParagraphElement))
    expect(c.mounted).toHaveBeenCalledTimes(1)
  })

  it('setProps() trigger rerender', () => {
    class C extends Component {
      mounted() {}
      updated() {}
      render() {
        return createElement('p', null, [this.props.text])
      }
    }

    const c = new C({ text: 'foo' })

    spyOn(c, 'mounted')
    spyOn(c, 'updated')
    spyOn(c, 'render').and.callThrough()

    expect(c.updated).not.toHaveBeenCalled()

    c.mount()

    expect(c.render).toHaveBeenCalledTimes(1)
    expect(c._element.firstChild.nodeValue).toBe('foo')
    expect(c.updated).toHaveBeenCalledTimes(0)

    c.setProps({ text: 'bar' })

    expect(c.render).toHaveBeenCalledTimes(2)
    expect(c._element.firstChild.nodeValue).toBe('bar')
    expect(c.updated).toHaveBeenCalledTimes(1)
    expect(c.mounted).toHaveBeenCalledTimes(1)
  })

  it('setState() trigger rerender async', (done) => {
    class C extends Component {
      constructor(props) {
        super(props)
        this.state = { text: 'foo' }
      }
      mounted() {}
      updated() {}
      render() {
        return createElement('p', null, [this.state.text])
      }
    }

    const c = new C

    spyOn(c, 'mounted')
    spyOn(c, 'updated')
    spyOn(c, 'render').and.callThrough()

    c.mount()

    expect(c.render).toHaveBeenCalledTimes(1)
    expect(c._element.firstChild.nodeValue).toBe('foo')

    c.setState({ text: 'bar' })
    c.setState({ text: 'barz' })

    expect(c.render).toHaveBeenCalledTimes(1)
    expect(c._element.firstChild.nodeValue).toBe('foo')
    expect(c.updated).not.toHaveBeenCalled()

    setTimeout(() => {
      expect(c.render).toHaveBeenCalledTimes(2)
      expect(c._element.firstChild.nodeValue).toBe('barz')
      expect(c.updated).toHaveBeenCalledTimes(1)
      expect(c.mounted).toHaveBeenCalledTimes(1)
      done()
    }, 200)
  })

})
