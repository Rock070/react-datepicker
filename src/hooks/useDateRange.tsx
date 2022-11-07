import { useState, useMemo, useContext, createContext } from 'react'
import { DAYS_NUM_IN_ONE_ROW, MONTH_NAMES } from '@/helpers/const'

import { ViewMode, DateBtn, Mode } from '@/types'

import { get } from '@/utils/time/get'
import isSameTimestamp from '@/utils/time/isSameTimestamp'
import splitGroup from '@/utils/splitGroup'

import getCalendar from '@/helpers/getCalendar'

interface DateRangeKey {
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
  date: Date[]
  setDate: React.Dispatch<React.SetStateAction<Date[]>>
  mode: Mode
}

export const DateRangeContext = createContext<DateRangeKey | null>(null)
export const useDateRange = () => useContext(DateRangeContext)

export const useCalendarBody = () => {
  const ctx = useDateRange()
  if (!ctx) return null
  const { date, setDate, displayDate, setDisplayDate, mode } = ctx
  const [hoverDate, setHoverDate] = useState(date[0])

  const isChoosingDateRange = useMemo(() => (Mode.DateRange & mode) && Array.isArray(date) && date[0] !== undefined && date[1] === undefined, [date])
  const isRangeHoverHandler = (itemDate: Date) => {
    if (!isChoosingDateRange) return false
    if (!Array.isArray(date)) return false
    if (hoverDate < date[0]) return itemDate < date[0] && itemDate > hoverDate
    return itemDate > date[0] && itemDate < hoverDate
  }
  const calendarDisplay = useMemo<DateBtn[][]>(() => {
    const result = getCalendar(displayDate).map(item => {
      const isSelected = (function () {
        if (Array.isArray(date) && Mode.DateRange & mode) {
          if (date[0] === undefined) return false
          if (isChoosingDateRange) return isSameTimestamp(item.date, date[0])
          return date[0] <= item.date && item.date <= date[1]
        }

        if (!Array.isArray(date)) return isSameTimestamp(item.date, date)
      }())

      return {
        ...item,
        clickFn: () => {
          setDisplayDate(item.date)
          if (Mode.DateRange & mode && Array.isArray(date)) {
            if (isChoosingDateRange) {
              if (item.date < date[0]) setDate([item.date, ...date])

              else setDate([...date, item.date])
            } else setDate([item.date])
            return
          }
          // @ts-expect-error
          setDate(item.date)
        },
        onMouseEnter: () => {
          // TODO: 可以優化成用 css hover + not:hover + tailwind group
          setHoverDate(item.date)
        },
        isRangeHover: isRangeHoverHandler(item.date),
        isSelected
      }
    })

    return splitGroup(result, DAYS_NUM_IN_ONE_ROW)
  }, [displayDate, isChoosingDateRange, hoverDate])

  return calendarDisplay
}

export const useCalendarHeader = () => {
  const ctx = useDateRange()
  if (!ctx) return null
  const { displayDate, setDisplayDate, changeViewMode } = ctx

  const nowYearMonth = useMemo(() => {
    const { y, m } = get(displayDate)

    return `${MONTH_NAMES[m]} ${y}`
  }, [displayDate])

  return {
    displayDate,
    nowYearMonth,
    changeViewMode,
    setDisplayDate
  }
}
