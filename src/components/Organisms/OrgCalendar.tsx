import React, { useState } from 'react'
import { CalendarContext } from '@/hooks/useCalendar'

import MolCalendar from '@/components/Molecules/MolDaysView'
import MolMonth from '@/components/Molecules/MolMonthsView'
import MolYear from '@/components/Molecules/MolYearsView'
import MolDecade from '@/components/Molecules/MolDecadesView'

import { ViewMode, Mode } from '@/types'

export interface CalendarProps {
  mode: Mode
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  width?: number
}
// TODO: multiple
const Calendar: React.FC<CalendarProps> = (props) => {
  const { date, setDate, width = 350, mode } = props
  const [displayDate, setDisplayDate] = useState(date)
  const [viewMode, changeViewMode] = useState<ViewMode>(ViewMode.Calendar)

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
        return MolCalendar
    }
  }())

  return (
    <CalendarContext.Provider value={{
      displayDate,
      setDisplayDate,
      changeViewMode,
      date,
      setDate,
      mode
    }}>

    <div className="space-y-6">
      <div className="flex flex-col items-center">
      </div>
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
    </CalendarContext.Provider>
  )
}

export default Calendar
