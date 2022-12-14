const isSameMonth = (date1: Date, date2: Date): boolean => {
  const isSameYear = date1.getFullYear() === date2.getFullYear()
  const isSameMonth = date1.getMonth() === date2.getMonth()
  return isSameYear && isSameMonth
}

export default isSameMonth
