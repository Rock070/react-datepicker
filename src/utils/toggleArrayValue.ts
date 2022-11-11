import { isDate } from '@/utils/is'

type Value = string | number | boolean | Date

const toggleArrayValue = (arr: Value[], value: Value) => {
  const clone = [...arr]
  const index = clone.findIndex(item => {
    const itemVal = isDate(item) ? item.valueOf() : item
    const targetVal = isDate(value) ? value.valueOf() : value
    return itemVal === targetVal
  })

  const isValInclude = index !== -1
  if (isValInclude) {
    clone.splice(index, 1)
    return clone
  }
  clone.push(value)
  return clone
}

export default toggleArrayValue
