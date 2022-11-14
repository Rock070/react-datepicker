import throttle from '@/utils/throttle'
import { beforeEach, describe, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

describe('Throttle', () => {
  it('Iterator', async _ => {
    const DELAY_TIME = 3000
    let count = 0
    const fn = () => {
      count++
    }
    const throttleFn = throttle(fn, DELAY_TIME)

    for (let i = 0; i < 10000; i++) throttleFn()
    expect(count).eq(1)

    vi.advanceTimersByTime(2999)
    for (let i = 0; i < 10000; i++) throttleFn()
    expect(count).eq(1)
  })

  it('Multiple Iterator', async _ => {
    const DELAY_TIME = 3000
    let count = 0
    const fn = () => {
      count++
    }
    const throttleFn = throttle(fn, DELAY_TIME)

    for (let i = 0; i < 10000; i++) throttleFn()

    vi.advanceTimersByTime(2999)
    expect(count).eq(1)
    for (let i = 0; i < 10000; i++) throttleFn()
    vi.advanceTimersByTime(1)
    expect(count).eq(1)

    for (let i = 0; i < 10000; i++) throttleFn()
    vi.advanceTimersByTime(2999)
    expect(count).eq(2)
    for (let i = 0; i < 10000; i++) throttleFn()
    vi.advanceTimersByTime(1)
    expect(count).eq(2)
  })
})
