import { useState, useMemo, useContext, createContext } from 'react'
import { DAYS_NUM_IN_ONE_ROW, MONTH_NAMES } from '@/helpers/const'

import { ViewMode, DateBtn, MonthBtn, Mode } from '@/types'

import { get } from '@/utils/time/get'
import getDecade from '@/utils/time/getDecade'
import isSameTimestamp from '@/utils/time/isSameTimestamp'
import isSameYear from '@/utils/time/isSameYear'
import isSameDecade from '@/utils/time/isSameDecade'
import getCentury from '@/utils/time/getCentury'

import splitGroup from '@/utils/splitGroup'
import pipe from '@/utils/pipe'

import getCalendar from '@/helpers/getCalendar'
import isSameYearMonth from '@/helpers/isSameYearMonth'

interface CalendarContextKey {
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  mode: Mode
}

export const CalendarContext = createContext<CalendarContextKey | null>(null)
export const useCalendarContext = () => useContext(CalendarContext)

export const useCalendar = (
  date: Date
) => {
  const [displayDate, setDisplayDate] = useState(date)
  const [viewMode, changeViewMode] = useState<ViewMode>(ViewMode.Calendar)

  // body

  return {
    displayDate,
    setDisplayDate,
    viewMode,
    changeViewMode
  }
}

const _useDatesBody = () => {
  const ctx = useCalendarContext()
  if (!ctx) return null

  const { date, setDate, displayDate, setDisplayDate, mode } = ctx
  const [hoverDate, setHoverDate] = useState(date)

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
              // @ts-expect-error
              if (item.date < date[0]) setDate([item.date, ...date])
              // @ts-expect-error
              else setDate([...date, item.date])
              // @ts-expect-error
            } else setDate([item.date])
            return
          }

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

const _useDatesHeader = () => {
  const ctx = useCalendarContext()
  if (!ctx) return null
  const { displayDate } = ctx

  const displayText = useMemo(() => {
    const { y, m } = get(displayDate)

    return `${MONTH_NAMES[m]} ${y}`
  }, [displayDate])

  return {
    displayText
  }
}

const _useMonthsHeader = () => {
  const ctx = useCalendarContext()
  if (!ctx) return null
  const { displayDate } = ctx

  const displayText = useMemo(() => {
    const { y } = get(displayDate)

    return `${y}`
  }, [displayDate])

  return { displayText }
}

const _useMonthsBody = () => {
  const ctx = useCalendarContext()
  if (!ctx) return null

  const { date, displayDate, setDisplayDate, changeViewMode } = ctx

  const { y } = get(displayDate)
  const setDisplayMonth = (monthVal: number) => {
    const selectMonth = new Date(y, monthVal)
    setDisplayDate(selectMonth)
    changeViewMode(ViewMode.Calendar)
  }

  const transformMonth = (months: string[]): MonthBtn[] => {
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
    (months: MonthBtn[]) => splitGroup(months, 3)
  )
  const monthGroup = pipeLine(MONTH_NAMES) as MonthBtn[][]

  return {
    displayMonth: monthGroup
  }
}

const _useYearsHeader = () => {
  const ctx = useCalendarContext()
  if (!ctx) return null
  const { displayDate } = ctx

  const displayText = useMemo(() => {
    const y = getDecade(displayDate)

    return `${y + 1} - ${y + 10}`
  }, [displayDate])

  return { displayText }
}

const _useYearsBody = () => {
  const ctx = useCalendarContext()
  if (!ctx) return null

  const { date, displayDate, setDisplayDate, changeViewMode } = ctx

  const year = getDecade(displayDate)
  const years = Array.from({ length: 10 }, (_, index) => year + index + 1)

  const setDisplayYear = (yearVal: number) => {
    const selectYear = new Date(yearVal, 1)
    setDisplayDate(selectYear)
    changeViewMode(ViewMode.Month)
  }

  const transformYear = (months: number[]): MonthBtn[] => {
    return months.map((y, index) => (
      {
        value: index,
        text: String(y),
        clickFn: () => setDisplayYear(y),
        disabled: false,
        // isSelected: isSameYear(date[0], new Date(y, item.value)) }
        isSelected: isSameYear(date, new Date(y, 1))
      }
    ))
  }
  const pipeLine = pipe(
    transformYear,
    (years: MonthBtn[]) => splitGroup(years, 3)
  )
  const yearGroup = pipeLine(years) as MonthBtn[][]

  return {
    displayYear: yearGroup
  }
}
const _useDecadesHeader = () => {
  const ctx = useCalendarContext()
  if (!ctx) return null
  const { displayDate } = ctx

  const displayText = useMemo(() => {
    const y = getCentury(displayDate)

    return `${y + 1} - ${y + 100}`
  }, [displayDate])

  return { displayText }
}

const _useDecadesBody = () => {
  const ctx = useCalendarContext()
  if (!ctx) return null

  const { date, displayDate, setDisplayDate, changeViewMode } = ctx

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

  const transformDecade = (months: typeof decades): MonthBtn[] => {
    return months.map((item, index) => (
      {
        ...item,
        clickFn: () => setDisplayDecade(item.value),
        disabled: false,
        // isSelected: isSameYear(date[0], new Date(y, item.value)) }
        isSelected: getIsSelected(new Date(item.value, 1))
      }
    ))
  }
  const pipeLine = pipe(
    transformDecade,
    (decades: MonthBtn[]) => splitGroup(decades, 3)
  )
  const decadeGroup = pipeLine(decades) as MonthBtn[][]

  return {
    displayDecade: decadeGroup
  }
}

export const useTableContext = () => {
  const ctx = useCalendarContext()
  if (!ctx) return null
  const { date, setDate, displayDate, setDisplayDate, mode, changeViewMode } = ctx
  return {
    date,
    setDate,
    displayDate,
    setDisplayDate,
    mode,
    changeViewMode,
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
