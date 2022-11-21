const isSameDate = (date1: Date, date2: Date): boolean => {
  const isSameYear = date1.getFullYear() === date2.getFullYear()
  const isSameMonth = date1.getMonth() === date2.getMonth()
  const isSameDate = date1.getDate() === date2.getDate()
  return isSameYear && isSameMonth && isSameDate
}

export default isSameDate
