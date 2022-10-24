import React, { useState } from 'react'

import MolCalendar from '@/components/Molecules/MolCalendarView'
import MolMonth from '@/components/Molecules/MolMonthView'
import MolYear from '@/components/Molecules/MolYearView'
import MolDecade from '@/components/Molecules/MolDecadeView'

import { ViewMode } from '@/types'

export interface CalendarProps {
  date: Date
  selectDate: (date: Date) => void
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const { date, selectDate } = props
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
    <div>
      <div className="flex flex-col items-center">
        <div>
          displayDate: { displayDate.toLocaleDateString() }
        </div>
        <div>
          viewMode: { viewMode }
        </div>
      </div>
      <DisplayView
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
        changeViewMode={changeViewMode}
        date={date}
        selectDate={selectDate}
      />
    </div>
  )
}

/**
 * -
 * - 考慮時區問題
 * - mode: 單選、多選(跨月份怎麼辦)、range
 * - view 模式:
 *    日曆、年、十年、百年
 * - 禁止 1970 以前
 * - disabled 日期
 * - 滾輪事件去切換日曆 (https://vuetifyjs.com/en/components/date-pickers/#colors)
 */
export default Calendar
