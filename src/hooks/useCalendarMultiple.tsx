import { useState, useMemo } from 'react'
import { DAYS_NUM_IN_ONE_ROW, MONTH_NAMES } from '@/helpers/const'

import { ViewMode, CalendarBtn } from '@/types'

import { get } from '@/utils/time/get'
import getDecade from '@/utils/time/getDecade'
import getCentury from '@/utils/time/getCentury'
import toggleArrayValue from '@/utils/toggleArrayValue'

import splitGroup from '@/utils/splitGroup'
import pipe from '@/utils/pipe'

import getCalendar from '@/helpers/getCalendar'

export const useCalendarMultiple = (
  date: Date[],
  setDate: (date: Date[]) => void,
  disabledDate: (date: Date) => boolean
) => {
  const [displayDate, setDisplayDate] = useState(date[0])

  const [viewMode, changeViewMode] = useState<ViewMode>(ViewMode.Day)

  // body

  const _useDatesBody = () => {
    const calendarDisplay = useMemo<CalendarBtn[][]>(() => {
      const result = getCalendar(displayDate).map(item => {
        const value = item.value as Date
        const isSelected = !!date.find(item => item.valueOf() === value.valueOf())

        const setDateImpl = (val: Date) => {
          setDisplayDate(val)
          setDate([...toggleArrayValue(date, val) as Date[]])
        }

        const disabled = disabledDate(value)

        const clickFn = disabled ? undefined : () => setDateImpl(value)

        return {
          ...item,
          clickFn,
          isSelected,
          disabled
        }
      })

      return splitGroup(result, DAYS_NUM_IN_ONE_ROW)
    }, [displayDate, date])

    return calendarDisplay
  }

  const _useDatesHeader = () => {
    const displayText = useMemo(() => {
      const { y, m } = get(displayDate)

      return `${MONTH_NAMES[m]} ${y}`
    }, [displayDate])

    return displayText
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
      const getIsSelected = (month: number) => {
        return !!date.find(item => item.getMonth() === month)
      }
      return months.map((m, index) => (
        {
          value: index,
          text: m,
          clickFn: () => setDisplayMonth(index),
          disabled: false,
          // FIXME: 判斷月份應該要也要判斷年份
          isSelected: getIsSelected(index)
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

    const getIsSelected = (year: number) => {
      return !!date.find(item => item.getFullYear() === year)
    }

    const transformYear = (months: number[]): CalendarBtn[] => {
      return months.map((y, index) => (
        {
          value: index,
          text: String(y),
          clickFn: () => setDisplayYear(y),
          disabled: false,
          isSelected: getIsSelected(y)
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
      return !!date.find(item => getDecade(item) === getDecade(itemDate))
    }

    const transformDecade = (decade: typeof decades): CalendarBtn[] => {
      return decade.map(item => (
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
