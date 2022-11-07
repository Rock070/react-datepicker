import React, { useState } from 'react'
import { useCalendar, CalendarContext } from '@/hooks/useCalendar'
import { useDateRange, DateRangeContext } from '@/hooks/useDateRange'

import MolDay from '@/components/Molecules/MolDaysView'
import MolMonth from '@/components/Molecules/MolMonthsView'
import MolYear from '@/components/Molecules/MolYearsView'
import MolDecade from '@/components/Molecules/MolDecadesView'

import { ViewMode, Mode } from '@/types'

export interface CalendarProps {
  mode: Mode
  date: Date | Date[]
  setDate: React.Dispatch<React.SetStateAction<Date | Date[]>>
  width?: number
}
// TODO: multiple

const Calendar: React.FC<CalendarProps> = (props) => {
  const { date, setDate, width = 350, mode } = props
  console.log(mode)
  const useFn = (function () {
    switch (mode) {
      case Mode.DateRange:
        return () => useDateRange(date[0])
      case Mode.DatePicker:
      default:
        return () => useCalendar(date)
    }
  }())
  console.log(useFn())
  const {
    viewMode,
    ...rest
  } = useFn()

  const CalendarProviderContext = (function () {
    switch (mode) {
      case Mode.DateRange:
        return DateRangeContext
      case Mode.DatePicker:
      default:
        return CalendarContext
    }
  }())

  const DisplayView = (function () {
    switch (viewMode) {
      case ViewMode.Month:
        return MolMonth
      case ViewMode.Year:
        return MolYear
      case ViewMode.Decade:
        return MolDecade
      case ViewMode.Calendar:
      default:
        return MolDay
    }
  }())

  return (
    <CalendarProviderContext.Provider value={{
      date,
      setDate,
      viewMode,
      mode,
      ...rest
    }}>

    <div className="space-y-6">
      <div/>
      <div
        style={{ width: `${width}px` }}
        className='
          text-sm bg-blend-soft-light
          shadow-sm shadow-gray
        '
      >
        <DisplayView />
      </div>
    </div>
    </CalendarProviderContext.Provider>
  )
}

export default Calendar
