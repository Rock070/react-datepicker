import React, { useState } from 'react'

import MolCalendar from '@/components/Molecules/MolCalendarView'
import MolMonth from '@/components/Molecules/MolMonthView'

import { ViewMode } from '@/types'

export interface CalendarProps {
  date: Date
  selectDate: (date: Date) => void
}

export default function Calendar (props: CalendarProps) {
  const { date, selectDate } = props
  const [displayDate, setDisplayDate] = useState(date)
  const [viewMode, changeViewMode] = useState<ViewMode>(1)

  const displayView = (function () {
    switch (viewMode) {
      case ViewMode.Month:
        return (
          <MolMonth
            displayDate={displayDate}
            setDisplayDate={setDisplayDate}
            changeViewMode={changeViewMode}
            date={date}
          />
        )
      case ViewMode.Year:
      case ViewMode.Decade:
      case ViewMode.Calendar:
      default:
        return (
          <MolCalendar
            displayDate={displayDate}
            setDisplayDate={setDisplayDate}
            changeViewMode={changeViewMode}
            date={date}
            selectDate={selectDate}
          />
        )
    }
  }())

  return (
    <div>
      <div>
        displayDate: { displayDate.toLocaleDateString() }
        viewMode: { viewMode }
      </div>
      { displayView }
    </div>
  )
}

/**
 * -
 * - 考慮時區問題
 * - mode: 單選、多選(跨月份怎麼辦)、range
 * - view 模式:
 *    日曆、年、十年、百年
 * - disabled 日期
 * - 滾輪事件去切換日曆 (https://vuetifyjs.com/en/components/date-pickers/#colors)
 */
