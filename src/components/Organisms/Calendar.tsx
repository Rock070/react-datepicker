import React, { useState } from 'react'
import { CalendarContext } from '@/hooks/useCalendarContext'

import MolCalendar from '@/components/Molecules/MolCalendarView'
import MolMonth from '@/components/Molecules/MolMonthView'
import MolYear from '@/components/Molecules/MolYearView'
import MolDecade from '@/components/Molecules/MolDecadeView'

import { ViewMode, Mode } from '@/types'

export interface CalendarProps {
  mode: Mode
  date: Date[] | Date
  setDate: React.Dispatch<React.SetStateAction<Date>> | React.Dispatch<React.SetStateAction<Date[]>>
  width?: number
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const { date, setDate, width = 350, mode } = props
  const [displayDate, setDisplayDate] = Array.isArray(date) ? useState(date[0]) : useState(date)
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
        <div>
          displayDate: { displayDate.toLocaleDateString() }
        </div>
        <div>
          viewMode: { viewMode }
        </div>
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
