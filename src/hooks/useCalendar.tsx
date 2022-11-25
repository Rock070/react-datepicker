import { useState, useMemo } from 'react'
import { DAYS_NUM_IN_ONE_ROW, MONTH_NAMES } from '@/helpers/const'

import { ViewMode, CalendarBtn } from '@/types'

import { get } from '@/utils/time/get'
import getDecade from '@/utils/time/getDecade'
import isSameDate from '@/utils/time/isSameDate'
import isSameYear from '@/utils/time/isSameYear'
import isSameDecade from '@/utils/time/isSameDecade'
import getCentury from '@/utils/time/getCentury'

import splitGroup from '@/utils/splitGroup'
import pipe from '@/utils/pipe'

import getCalendar from '@/helpers/getCalendar'
import isSameYearMonth from '@/helpers/isSameYearMonth'

export const useCalendar = (
  date: Date,
  setDate: (date: Date) => void,
  disabledDate: (date: Date) => boolean
) => {
  const [displayDate, setDisplayDate] = useState(date)
  const [viewMode, changeViewMode] = useState<ViewMode>(ViewMode.Day)

  // body
  const _useDatesHeader = () => {
    const displayText = useMemo(() => {
      const { y, m } = get(displayDate)

      return `${MONTH_NAMES[m]} ${y}`
    }, [displayDate])

    return displayText
  }

  const _useDatesBody = () => {
    const [hoverDate, setHoverDate] = useState(date)

    const isRangeHoverHandler = (itemDate: Date) => {
      if (!Array.isArray(date)) return false
      if (hoverDate < date[0]) return itemDate < date[0] && itemDate > hoverDate
      return itemDate > date[0] && itemDate < hoverDate
    }

    const calendarDisplay = useMemo<CalendarBtn[][]>(() => {
      const result = getCalendar(displayDate).map(item => {
        const value = item.value as Date
        const isSelected = isSameDate(value, date)
        const disabled = disabledDate(value)
        const clickFn = disabled
          ? undefined
          : () => {
              setDisplayDate(value)
              setDate(value)
            }

        return {
          ...item,
          clickFn,
          seEnter: () => {
          // TODO: 可以優化成用 css hover + not:hover + tailwind group
            setHoverDate(value)
          },
          isRangeHover: isRangeHoverHandler(value),
          isSelected,
          disabled
        }
      })

      return splitGroup(result, DAYS_NUM_IN_ONE_ROW)
    }, [displayDate, hoverDate])

    return calendarDisplay
  }

  const _useMonthsHeader = () => {
    const displayText = useMemo(() => {
      const { y } = get(displayDate)

      return `${y}`
    }, [displayDate])

    return displayText
  }

  const _useMonthsBody = () => {
    const { y } = get(displayDate)
    const setDisplayMonth = (monthVal: number) => {
      const selectMonth = new Date(y, monthVal)
      setDisplayDate(selectMonth)
      changeViewMode(ViewMode.Day)
    }

    const transformMonth = (months: string[]): CalendarBtn[] => {
      return months.map((m, index) => (
        {
          value: index,
          text: m,
          clickFn: () => setDisplayMonth(index),
          disabled: false,
          isSelected: isSameYearMonth(date, new Date(y, index))
        }
      ))
    }
    const pipeLine = pipe(
      transformMonth,
      (months: CalendarBtn[]) => splitGroup(months, 3)
    )
    const monthGroup = pipeLine(MONTH_NAMES) as CalendarBtn[][]

    return monthGroup
  }

  const _useYearsHeader = () => {
    const displayText = useMemo(() => {
      const y = getDecade(displayDate)

      return `${y + 1} - ${y + 10}`
    }, [displayDate])

    return displayText
  }

  const _useYearsBody = () => {
    const year = getDecade(displayDate)
    const years = Array.from({ length: 10 }, (_, index) => year + index + 1)

    const setDisplayYear = (yearVal: number) => {
      const selectYear = new Date(yearVal, 1)
      setDisplayDate(selectYear)
      changeViewMode(ViewMode.Month)
    }

    const transformYear = (months: number[]): CalendarBtn[] => {
      return months.map((y, index) => (
        {
          value: index,
          text: String(y),
          clickFn: () => setDisplayYear(y),
          disabled: false,
          isSelected: isSameYear(date, new Date(y, 1))
        }
      ))
    }
    const pipeLine = pipe(
      transformYear,
      (years: CalendarBtn[]) => splitGroup(years, 3)
    )
    const yearGroup = pipeLine(years) as CalendarBtn[][]

    return yearGroup
  }
  const _useDecadesHeader = () => {
    const displayText = useMemo(() => {
      const y = getCentury(displayDate)

      return `${y + 1} - ${y + 100}`
    }, [displayDate])

    return displayText
  }

  const _useDecadesBody = () => {
    const decade = getCentury(displayDate)
    const decades = Array.from({ length: 10 }, (_, index) => {
      const RATE = 10

      return {
        value: decade + index * RATE,
        text: `${(decade + index * RATE) + 1} - ${decade + ((index + 1) * RATE)}`
      }
    })

    const setDisplayDecade = (yearVal: number) => {
      const selectDecade = new Date(yearVal, 1)
      setDisplayDate(selectDecade)
      changeViewMode(ViewMode.Year)
    }

    const getIsSelected = (itemDate: Date) => {
      if (!Array.isArray(date)) return isSameDecade(date, itemDate)

      if (date[0] === undefined) return false
      if (date[1] === undefined) return isSameDecade(date[0], itemDate)
      return date[0] <= itemDate && itemDate <= date[1]
    }

    const transformDecade = (months: typeof decades): CalendarBtn[] => {
      return months.map(item => (
        {
          ...item,
          clickFn: () => setDisplayDecade(item.value),
          disabled: false,
          isSelected: getIsSelected(new Date(item.value, 1))
        }
      ))
    }
    const pipeLine = pipe(
      transformDecade,
      (decades: CalendarBtn[]) => splitGroup(decades, 3)
    )
    const decadeGroup = pipeLine(decades) as CalendarBtn[][]

    return decadeGroup
  }

  const useTableContext = () => {
    return {
      dayHeader: _useDatesHeader(),
      dayBody: _useDatesBody(),
      monthHeader: _useMonthsHeader(),
      monthBody: _useMonthsBody(),
      yearHeader: _useYearsHeader(),
      yearBody: _useYearsBody(),
      decadeHeader: _useDecadesHeader(),
      decadeBody: _useDecadesBody()
    }
  }

  return {
    displayDate,
    setDisplayDate,
    viewMode,
    changeViewMode,
    ...useTableContext()
  }
}
