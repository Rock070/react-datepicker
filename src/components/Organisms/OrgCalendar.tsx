import React from 'react'
import { useCalendar } from '@/hooks/useCalendar'
import { useDateRange } from '@/hooks/useDateRange'

import MolDay from '@/components/Molecules/MolDaysView'
import MolMonth from '@/components/Molecules/MolMonthsView'
import MolYear from '@/components/Molecules/MolYearsView'
import MolDecade from '@/components/Molecules/MolDecadesView'

import { isArray } from '@/utils/is'

import { ViewMode, Mode } from '@/types'

export interface CalendarProps {
  mode: Mode
  date: Date | Date[]
  setDate: React.Dispatch<React.SetStateAction<Date>> | React.Dispatch<React.SetStateAction<Date[]>>
  width?: number
}
// TODO: multiple

const Calendar: React.FC<CalendarProps> = props => {
  const { date, setDate, width = 350, mode } = props
  if ((mode & Mode.DateRange) && !isArray(date)) {
    console.error('Date need to be array type')
    return <></>
  }

  const useFn = (function () {
    switch (mode) {
      case Mode.DateRange:
        return () => useDateRange((date as Date[]), (setDate as (date: Date[]) => any))
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
    <div className="space-y-6">
      <div/>
      <div
        style={{ width: `${width}px` }}
        className='
          text-sm bg-blend-soft-light
          shadow-sm shadow-gray
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