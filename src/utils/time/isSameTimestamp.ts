const isSameTimestamp = (date1: Date, date2: Date): boolean => {
  return date1.getTime() === date2.getTime()
}

export default isSameTimestamp
