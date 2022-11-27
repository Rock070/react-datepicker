import { DAY_MS } from '@/helpers/const'

/**
 * @example
 * ```js
 * const today = new Date() // Sun Nov 27 2022 02:56:21 GMT+0800
 * getEndTimeOfTheDate(today) // Sun Nov 27 2022 23:59:59 GMT+0800
 * ```
 */
const getEndTimeOfTheDate = (date: Date) => {
  if (!(date instanceof Date)) {
    console.error(`
      getEndTimeOfTheDate warn, param date need to be Date type.
    `)
    return date
  }

  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()

  const startOfDayTimestamp = new Date(y, m, d).getTime()
  const endOfDayTimestamp = startOfDayTimestamp + DAY_MS - 1
  return new Date(endOfDayTimestamp)
}

export default getEndTimeOfTheDate
