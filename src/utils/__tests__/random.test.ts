import random from '@/utils/random'
import { describe, expect, it } from 'vitest'

const testData = Array.from({ length: 50 }, (_, index) => `case ${index + 1}`)

describe('random', () => {
  it.each(testData)('in range for %s', () => {
    expect(random(1, 2)).toBeGreaterThanOrEqual(1)
    expect(random(1, 2)).toBeLessThanOrEqual(2)

    expect(random(1, 1)).eq(1)

    expect(random(2, 5)).toBeGreaterThanOrEqual(2)
    expect(random(2, 5)).toBeLessThanOrEqual(5)

    expect(random(0, 0)).eq(0)

    expect(random(1, 100)).toBeGreaterThanOrEqual(1)
    expect(random(1, 100)).toBeLessThanOrEqual(100)
  })
  it.each(testData)('not in range for %s', () => {
    expect(random(1)).toBeGreaterThanOrEqual(0)
    expect(random(1)).toBeLessThanOrEqual(1)

    expect(random(0)).eq(0)

    expect(random(5)).toBeGreaterThanOrEqual(0)
    expect(random(5)).toBeLessThanOrEqual(5)

    expect(random(100)).toBeGreaterThanOrEqual(0)
    expect(random(100)).toBeLessThanOrEqual(100)
  })
})
