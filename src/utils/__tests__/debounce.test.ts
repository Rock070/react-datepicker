import debounce from '@/utils/debounce'
import { beforeEach, describe, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

describe('Debounce', () => {
  it('Iterator', async _ => {
    const DELAY_TIME = 3000
    let count = 0
    const fn = () => {
      count++
    }
    const debounceFn = debounce(fn, DELAY_TIME)

    for (let i = 0; i < 10000; i++) {
      debounceFn()
    }

    vi.advanceTimersByTime(3000)

    expect(count).eq(1)
  })

  it('Multiple Iterator', async _ => {
    const DELAY_TIME = 3000
    let count = 0
    const fn = () => {
      count++
    }
    const debounceFn = debounce(fn, DELAY_TIME)

    for (let i = 0; i < 10000; i++) debounceFn()

    vi.advanceTimersByTime(2999)
    expect(count).eq(0)
    vi.advanceTimersByTime(1)
    expect(count).eq(1)

    for (let i = 0; i < 10000; i++) debounceFn()
    vi.advanceTimersByTime(2999)
    expect(count).eq(1)
    vi.advanceTimersByTime(1)
    expect(count).eq(2)
  })
})
