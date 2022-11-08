import isSameYear from '@/utils/time/isSameYear'
import isSameMonth from '@/utils/time/isSameMonth'

const isSameYearMonth = (date1: Date, date2: Date) => {
  return isSameYear(date1, date2) && isSameMonth(date1, date2)
}

export default isSameYearMonth
