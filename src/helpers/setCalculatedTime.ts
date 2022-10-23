import add from '@/utils/time/add'
import minus from '@/utils/time/minus'
import type { TimeItem } from '@/types'

const setCalculatedTime = (
  date: Date,
  calculateMethod: typeof add | typeof minus,
  timeItem: TimeItem,
  setTimeMethod: (date: Date) => void
) => {
  const calculatedDate = calculateMethod(date, timeItem)

  setTimeMethod(calculatedDate)
}

export default setCalculatedTime
