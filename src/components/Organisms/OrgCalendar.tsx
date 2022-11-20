import React from 'react'
import { useCalendar } from '@/hooks/useCalendar'
import { useDateRange } from '@/hooks/useDateRange'
import { useCalendarMultiple } from '@/hooks/useCalendarMultiple'
import consola from 'consola'

import MolDay from '@/components/Molecules/MolDaysView'
import MolMonth from '@/components/Molecules/MolMonthsView'
import MolYear from '@/components/Molecules/MolYearsView'
import MolDecade from '@/components/Molecules/MolDecadesView'

import { isArray } from '@/utils/is'

import { ViewMode, Mode } from '@/types'

export interface CalendarProps {
  date: Date | Date[]
  setDate: React.Dispatch<React.SetStateAction<Date>> | React.Dispatch<React.SetStateAction<Date[]>>
  mode?: Mode
  width?: number
}

const Calendar: React.FC<CalendarProps> = props => {
  const { date, setDate, width = 350, mode = Mode.DatePicker } = props
  if (date == undefined) {
    consola.error('date is undefined, it has to be value as Date type with default mode or Date[] type with multiple, range mode')
    return <></>
  }
  if (setDate == undefined) {
    consola.error('setDate is undefined')
    return <></>
  }
  if (mode == undefined) {
    consola.error('mode')
    return <></>
  }
  if ((mode & Mode.DateRange) && !isArray(date)) {
    consola.error('Date need to be array type')
    return <></>
  }

  const useFn = (function () {
    switch (mode) {
      case Mode.DateRange:
        return () => useDateRange((date as Date[]), (setDate as (date: Date[]) => any))
      case Mode.DatePickerMultiple:
        return () => useCalendarMultiple((date as Date[]), (setDate as (date: Date[]) => any))
      case Mode.DatePicker:
      default:
        return () => useCalendar((date as Date), (setDate as (date: Date) => any))
    }
  }())

  const {
    viewMode,
    ...rest
  } = useFn()

  const DisplayView = (function () {
    switch (viewMode) {
      case ViewMode.Decade:
        return MolDecade
      case ViewMode.Year:
        return MolYear
      case ViewMode.Month:
        return MolMonth
      case ViewMode.Day:
      default:
        return MolDay
    }
  }())

  return (
    <div className="mochi-calendar mochi-space-y-6">
      <div
        style={{ width: `${width}px` }}
        className='
          mochi-text-sm mochi-bg-blend-soft-light
          mochi-shadow-sm mochi-shadow-gray
        '
      >
        <DisplayView
          { ...rest }
        />
      </div>
    </div>
  )
}

export default Calendar
