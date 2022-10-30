import { useContext, createContext } from 'react'
import type { ViewMode } from '@/types'

interface CalendarContextKey {
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
  date: Date
  setDate: (date: Date) => void
}

export const CalendarContext = createContext<CalendarContextKey | null>(null)
export const useCalendarContext = () => useContext(CalendarContext)
