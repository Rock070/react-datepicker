import type { TimeItem } from '@/types'

const minus = (date: Date, minusItem?: TimeItem) => {
  if (minusItem == null) return date
  const baseYears = date.getFullYear()
  const baseMonths = date.getMonth()
  const baseDays = date.getDate()
  const baseHours = date.getHours()
  const baseMinutes = date.getMinutes()
  const baseSeconds = date.getSeconds()

  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = minusItem

  return new Date(
    baseYears - years,
    baseMonths - months,
    baseDays - (days + weeks * 7),
    baseHours - hours,
    baseMinutes - minutes,
    baseSeconds - seconds
  )
}

export default minus
