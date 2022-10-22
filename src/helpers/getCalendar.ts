import formatter from '@/utils/time/formatter';
import splitGroup from '@/utils/splitGroup';
import {
  get,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getHowManyDaysInThisMonth,
  getTotalRowsNumInCalendar,
  getTimestamp,
  getFirstDayOfNextMonth,
  getLastDayOfLastMonth
} from '@/utils/time/get';

import { DAYS_NUM_IN_ONE_ROW, DAY_MS } from '@/helpers/const';

import type { DateBtn } from '@/types';


const getCalendar = (date: Date): DateBtn[][] => {
  const { y, m } = get(date);
  const firstDayOfMonth = getFirstDayOfMonth(date);
  const lastDayOfMonth = getLastDayOfMonth(date);
  const { day: firstDayOfMonthDay } = get(firstDayOfMonth);
  const { day: lastDayOfMonthDay } = get(lastDayOfMonth);

  const lastMonthDays = firstDayOfMonthDay;
  const nextMonthDays = DAYS_NUM_IN_ONE_ROW - lastDayOfMonthDay - 1;
  const daysNumInThisMonth = getHowManyDaysInThisMonth(date)
  const rowsNum = getTotalRowsNumInCalendar(date)

  const result: DateBtn[] = []
  /**
   * 當月
   */
  for (let i = 1; i <= daysNumInThisMonth; i++) {
    const targetDate = new Date(y, m, i);
    result.push({
      timestamp: getTimestamp(targetDate),
      time: get(targetDate),
      date: targetDate,
      clickFn: () => {},
      disabled: false,
      selected: false,
      isThisMonth: true,
    })
  }
  /**
   * 上月
   */
  const lastDayOfLastMonth = getLastDayOfLastMonth(date);
  const lastDayOfLastMonthTimestamp = getTimestamp(lastDayOfLastMonth);
  for (let i = 0; i < lastMonthDays; i++) {
    const timestamp = lastDayOfLastMonthTimestamp - (i * DAY_MS);
    const targetDate = new Date(timestamp);

    result.unshift({
      timestamp: timestamp,
      date: targetDate,
      time: get(targetDate),
      clickFn: () => {},
      disabled: false,
      selected: false,
      isThisMonth: false,
    })
  }
  /**
   * 下月
   */
  const firstDayOfNextMonth = getFirstDayOfNextMonth(date);
  const firstDayOfNextMonthTimestamp = getTimestamp(firstDayOfNextMonth);
  for (let i = 0; i < nextMonthDays; i++) {

    const timestamp = firstDayOfNextMonthTimestamp + (i * DAY_MS);
    const targetDate = new Date(timestamp);

    result.push({
      date: targetDate,
      timestamp,
      time: get(targetDate),
      clickFn: () => {},
      disabled: false,
      selected: false,
      isThisMonth: false,
    })
  }
  return splitGroup(result, DAYS_NUM_IN_ONE_ROW);

}

export default getCalendar
