import { useState, useMemo } from 'react'
import { DAYS_NUM_IN_ONE_ROW, MONTH_NAMES } from '@/helpers/const'

import { ViewMode, CalendarBtn } from '@/types'

import { get } from '@/utils/time/get'
import getDecade from '@/utils/time/getDecade'
import isSameTimestamp from '@/utils/time/isSameTimestamp'
import getCentury from '@/utils/time/getCentury'

import splitGroup from '@/utils/splitGroup'
import inRange from '@/utils/inRange'
import pipe from '@/utils/pipe'

import getCalendar from '@/helpers/getCalendar'

export const useDateRange = (
  date: Date[],
  setDate: (date: Date[]) => void,
  disabledDate: (date: Date) => boolean
) => {
  const [displayDate, setDisplayDate] = useState(date[0])

  const [viewMode, changeViewMode] = useState<ViewMode>(ViewMode.Day)

  // body

  const _useDatesBody = () => {
    const [hoverDate, setHoverDate] = useState(date[0])

    const isChoosingDateRange = useMemo(() => date[0] !== undefined && date[1] === undefined, [date])
    const isRangeHoverHandler = (itemDate: Date) => {
      if (!isChoosingDateRange) return false

      if (hoverDate < date[0]) return itemDate < date[0] && itemDate > hoverDate
      return itemDate > date[0] && itemDate < hoverDate
    }

    const calendarDisplay = useMemo<CalendarBtn[][]>(() => {
      const result = getCalendar(displayDate).map(item => {
        const value = item.value as Date
        const isSelected = (function () {
          const [date1, date2] = date
          if (date1 === undefined) return false
          if (isChoosingDateRange) return isSameTimestamp(value, date1)

          return inRange(value, date1, date2)
        }())
        const disabled = disabledDate(value)
        const clickFn = disabled
          ? undefined
          : () => {
              setDisplayDate(value)
              if (isChoosingDateRange) {
                if (value < date[0]) setDate([value, ...date])

                else setDate([...date, value])
              } else setDate([value])
            }

        return {
          ...item,
          clickFn,
          onMouseEnter: () => {
            // TODO: 可以優化成用 css hover + not:hover + tailwind group
            setHoverDate(value)
          },
          isRangeHover: isRangeHoverHandler(value),
          isSelected,
          disabled
        }
      })

      return splitGroup(result, DAYS_NUM_IN_ONE_ROW)
    }, [displayDate, isChoosingDateRange, hoverDate])

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
        const [date1, date2] = date

        const target = new Date(y, month)
        return inRange(target, date1, date2)
      }
      return months.map((m, index) => (
        {
          value: index,
          text: m,
          clickFn: () => setDisplayMonth(index),
          disabled: false,
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
    // FIXME: 年度 selected 壞掉
    const years = Array.from({ length: 10 }, (_, index) => year + index + 1)

    const setDisplayYear = (yearVal: number) => {
      const selectYear = new Date(yearVal, 1)
      setDisplayDate(selectYear)
      changeViewMode(ViewMode.Month)
    }

    const getIsSelected = (year: number) => {
      const [date1, date2] = date

      const target = new Date(year, 1)
      return inRange(target, date1, date2)
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
      const [date1, date2] = date

      return inRange(itemDate, date1, date2)
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
