import {
  get,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getHowManyDaysInThisMonth,
  getTimestamp,
  getFirstDayOfNextMonth,
  getLastDayOfLastMonth
} from '@/utils/time/get'

import { DAYS_NUM_IN_ONE_ROW, DAY_MS } from '@/helpers/const'

import type { CalendarBtn } from '@/types'

const getCalendar = (date: Date): CalendarBtn[] => {
  const { y, m } = get(date)
  const firstDayOfMonth = getFirstDayOfMonth(date)
  const lastDayOfMonth = getLastDayOfMonth(date)
  const { day: firstDayOfMonthDay } = get(firstDayOfMonth)
  const { day: lastDayOfMonthDay } = get(lastDayOfMonth)

  const lastMonthDays = firstDayOfMonthDay
  const nextMonthDays = DAYS_NUM_IN_ONE_ROW - lastDayOfMonthDay - 1
  const daysNumInThisMonth = getHowManyDaysInThisMonth(date)

  const result: CalendarBtn[] = []
  /**
   * 當月
   */
  for (let i = 1; i <= daysNumInThisMonth; i++) {
    const targetDate = new Date(y, m, i)
    result.push({
      timestamp: getTimestamp(targetDate),
      time: get(targetDate),
      value: targetDate,
      clickFn: () => {},
      disabled: false,
      isSelected: false,
      isThisMonth: true
    })
  }
  /**
   * 上月
   */
  const lastDayOfLastMonth = getLastDayOfLastMonth(date)
  const lastDayOfLastMonthTimestamp = getTimestamp(lastDayOfLastMonth)
  for (let i = 0; i < lastMonthDays; i++) {
    const timestamp = lastDayOfLastMonthTimestamp - (i * DAY_MS)
    const targetDate = new Date(timestamp)

    result.unshift({
      timestamp,
      value: targetDate,
      time: get(targetDate),
      clickFn: () => {},
      disabled: false,
      isSelected: false,
      isThisMonth: false
    })
  }
  /**
   * 下月
   */
  const firstDayOfNextMonth = getFirstDayOfNextMonth(date)
  const firstDayOfNextMonthTimestamp = getTimestamp(firstDayOfNextMonth)
  for (let i = 0; i < nextMonthDays; i++) {
    const timestamp = firstDayOfNextMonthTimestamp + (i * DAY_MS)
    const targetDate = new Date(timestamp)

    result.push({
      value: targetDate,
      timestamp,
      time: get(targetDate),
      clickFn: () => {},
      disabled: false,
      isSelected: false,
      isThisMonth: false
    })
  }
  return result
}

export default getCalendar
