import splitGroup from '@/utils/splitGroup'
import { describe, expect, it } from 'vitest'

describe('SplitGroup', () => {
  it('split number', _ => {
    const arr = [1, 2, 3, 4, 5]
    expect(splitGroup(arr, 2)).toEqual([[1, 2], [3, 4], [5]])
  })
  it('split mixed', _ => {
    const arr = [1, undefined, 3, null, new Date(2022, 2)]
    expect(splitGroup(arr, 2)).toEqual([[1, undefined], [3, null], [new Date(2022, 2)]])
  })
  it('divide to 1', _ => {
    const arr = [1, undefined, 3, null, new Date(2022, 2)]
    expect(splitGroup(arr, 1)).toEqual([[1], [undefined], [3], [null], [new Date(2022, 2)]])
  })
  it('divide to 10', _ => {
    const arr = [1, undefined, 3, null, new Date(2022, 2)]
    expect(splitGroup(arr, 10)).toEqual([[1, undefined, 3, null, new Date(2022, 2)]])
  })
})
