import { Mixins } from 'lib/keyboard'

describe('keyboard mixins', () => {
  it('a dispatch method is required to dispatch a custom event', () => {
    expect(Mixins.dispatch).toThrowError()
  })
})
