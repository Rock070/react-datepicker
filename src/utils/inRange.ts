type Param = number | Date

const inRange = (target: Param, start: Param, end: Param) => {
  if (start == undefined) return false
  if (end == undefined) return target >= start
  return start <= target && target <= end
}

export default inRange
