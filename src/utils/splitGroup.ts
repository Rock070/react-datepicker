
/**
 * const arr = [1, 2, 3, 4, 5];
 *
 * splitGroup(arr, 2) => [[1, 2], [3, 4], [5]];
 *
 * @param arr
 * @param num
 */
const splitGroup = (arr: any[], num: number) => {
  /**
   * TODO: deep clone
   */
  if (arr.length === 0) return []

  const clone = [...arr]
  const result = []

  const divideTime = Math.ceil(clone.length / num)

  for (let i = 0; i < divideTime; i++) {
    result.push(clone.slice(i * num, i * num + num))
  }

  return result
}

export default splitGroup
