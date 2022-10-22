import { DAY_MS, DAYS_NUM_IN_ONE_ROW } from '@/helpers/const'
import type { Time } from '@/types';

export const getFullYear = (date: Date) => date.getFullYear();
export const getMonth = (date: Date) => date.getMonth();
export const getDate = (date: Date) => date.getDate()
export const getDay = (date: Date) => date.getDay()
export const getTimestamp = (date: Date) => date.getTime();

export const get = (date: Date): Time => {
  const y = getFullYear(date);
  const m = getMonth(date);
  const d = getDate(date);
  const day = getDay(date);
  const t = getTimestamp(date);
  return {
    y,
    m,
    d,
    t,
    day,
  }
}

export const getFirstDayOfMonth = (date: Date) => {
  const { y, m } = get(date);
  return new Date(y, m)
}

export const getFirstDayOfNextMonth = (date: Date) => {
  const { y, m } = get(date);
  return new Date(y, m + 1)
}

export const getLastDayOfLastMonth = (date: Date) => {
  const firstDay = getFirstDayOfMonth(date);
  const timestamp = getTimestamp(firstDay);
  return new Date(timestamp - DAY_MS);
}

export const getLastDayOfMonth = (date: Date) => {
  const firstDayOfNextMonth = getFirstDayOfNextMonth(date);
  const firstDayOfNextMonthTimestamp = getTimestamp(firstDayOfNextMonth);
  const lastDayOfThisMonth = new Date(firstDayOfNextMonthTimestamp - DAY_MS)

  return lastDayOfThisMonth
}

export const getFirstDayOfYear = (date: Date) => {
  const { y } = get(date);
  return new Date(y)
}


export const getLastDayOfYear = (date: Date) => {
  const { y } = get(date);
  const firstDayOfNextYear = new Date(y + 1)
  const firstDayOfNextYearTimestamp = getTimestamp(firstDayOfNextYear);
  const lastDayOfThisYear = new Date(firstDayOfNextYearTimestamp - DAY_MS)

  return lastDayOfThisYear
}

export const getHowManyDaysInThisMonth = (date: Date) => {
  const lastDay = get(getLastDayOfMonth(date));

  return lastDay.d
}

export const getTotalRowsNumInCalendar = (date: Date) => {
  const firstDayOfMonth = getFirstDayOfMonth(date);

  const { day: firstDayOfMonthDay } = get(firstDayOfMonth);
  const daysNumInThisMonth = getHowManyDaysInThisMonth(date)

  return Math.ceil((daysNumInThisMonth - (DAYS_NUM_IN_ONE_ROW - firstDayOfMonthDay)) / DAYS_NUM_IN_ONE_ROW)
}

export const getFullDaysDisplayNumbers = (date: Date) => {

}

