export interface DateBtn {
  timestamp: number
  date: Date
  time: Time
  clickFn: () => void
  mouseFn?: () => void
  isSelected?: boolean

  disabled?: boolean
  isThisMonth: boolean

  isRangeHover?: boolean
  onMouseEnter?: (...arg: any[]) => void
}

// TODO 整合 BTN TYPE
export interface MonthBtn {
  value: number | string
  text: string
  clickFn?: () => void

  disabled?: boolean

  isSelected?: boolean
}

export interface Time {
  y: number
  m: number
  d: number
  t: number
  day: number
}

export interface TimeItem {
  years?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

export const enum Mode {
  DatePicker = 1,
  DateRange = 1 << 1,
}

export const enum ViewMode {
  Calendar = 1,
  Month = 1 << 1,
  Year = 1 << 2,
  Decade = 1 << 3,
}

export const enum WheelDirection {
  NONE,
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
}
