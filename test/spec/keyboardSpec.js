import { Interface } from '../../lib/func/keyboard'

describe('keyboard interface', () => {
  it('a dispatch method is required to dispatch a custom event', () => {
    expect(Interface.dispatch).toThrowError()
  })
})