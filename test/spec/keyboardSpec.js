import { Mixins } from 'lib/keyboard'

describe('keyboard interface', () => {
  it('a dispatch method is required to dispatch a custom event', () => {
    expect(Mixins.dispatch).toThrowError()
  })
})