import { DAY_MS } from '@/helpers/const'

const isToday = (target: Date): boolean => {
  if (!(target instanceof Date)) return target

  const targetYear = target.getFullYear()
  const targetMonth = target.getMonth()
  const targetDate = target.getDate()
  const targetTimestamp = target.getTime()
  const startOfTargetDateTimeStamp = new Date(targetYear, targetMonth, targetDate).getTime()
  const endOfTargetDateTimeStamp = startOfTargetDateTimeStamp + DAY_MS - 1

  return startOfTargetDateTimeStamp <= targetTimestamp && targetTimestamp <= endOfTargetDateTimeStamp
}

export default isToday
