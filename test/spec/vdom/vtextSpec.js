import { VText } from 'lib/utils/vdom.js'

describe('vtext', () => {

  it('render', () => {
    const vtext = new VText('foo')
    const element = vtext.render()

    expect(element).toEqual(jasmine.any(Text))
    expect(element.nodeValue).toBe('foo')
  })

})
