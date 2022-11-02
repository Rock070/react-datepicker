import { useContext, createContext } from 'react'
import type { ViewMode, Mode } from '@/types'

interface CalendarContextKey {
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
  date: Date | Date[]
  setDate: React.Dispatch<React.SetStateAction<Date>> | React.Dispatch<React.SetStateAction<Date[]>>
  mode: Mode
}

export const CalendarContext = createContext<CalendarContextKey | null>(null)
export const useCalendarContext = () => useContext(CalendarContext)
