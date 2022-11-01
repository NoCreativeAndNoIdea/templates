import {describe, expect, it} from 'vitest'
import {add} from '../src/main'

describe('addition', () => {
  it('should success', () => {
    expect(add(1)).toBe(2)
  })

  it('So 10 should be equal to 20', () => {
    expect(add(10)).toBe(20)
  })
})
