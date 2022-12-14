import toggleArrayValue from '@/utils/toggleArrayValue'
import { describe, expect, it } from 'vitest'

describe('toggleArrayValue', () => {
  it('Toggle number', _ => {
    const arr = [1, 2, 3]

    let result = toggleArrayValue(arr, 2)
    expect(result).toEqual([1, 3])
    result = toggleArrayValue(result, 4)
    expect(result).toEqual([1, 3, 4])
  })

  it('Toggle string', () => {
    const arr = ['1', '2', '3']

    let result = toggleArrayValue(arr, '2')
    expect(result).toEqual(['1', '3'])
    result = toggleArrayValue(result, '4')
    expect(result).toEqual(['1', '3', '4'])
  })

  it('Toggle Date', () => {
    const arr = [new Date(2022, 1), new Date(2022, 2), new Date(2022, 3)]

    let result = toggleArrayValue(arr, new Date(2022, 2))
    expect(result).toEqual([new Date(2022, 1), new Date(2022, 3)])
    result = toggleArrayValue(result, new Date(2022, 4))
    expect(result).toEqual([new Date(2022, 1), new Date(2022, 3), new Date(2022, 4)])
  })

  it('Toggle number, string, Date', () => {
    const arr = [new Date(2022, 1), 1, '2', 4, new Date(2022, 4)]

    let result = toggleArrayValue(arr, new Date(2022, 2))
    expect(result).toEqual([new Date(2022, 1), 1, '2', 4, new Date(2022, 4), new Date(2022, 2)])
    result = toggleArrayValue(result, new Date(2022, 4))
    result = toggleArrayValue(result, 2)
    result = toggleArrayValue(result, '2')
    expect(result).toEqual([new Date(2022, 1), 1, 4, new Date(2022, 2), 2])
  })
})
