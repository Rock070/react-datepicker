type Param = number | Date

const inRange = (target: Param, start: Param, end: Param) => {
  const targetType = Object.prototype.toString.call(target)
  const startType = Object.prototype.toString.call(start)
  const endType = Object.prototype.toString.call(end)

  if (startType !== targetType || endType !== targetType) {
    console.warn('Utils `InRange` Warning: Target value type is different from Start, End value type')
    return false
  }

  if (start == undefined) return false
  if (end == undefined) return target >= start
  return start <= target && target <= end
}

export default inRange
