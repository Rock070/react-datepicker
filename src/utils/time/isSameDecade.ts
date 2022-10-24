const isSameDecade = (date1: Date, date2: Date): boolean => {
  const year1 = date1.getFullYear()
  const year2 = date2.getFullYear()

  const decadeFirstYear1 = year1 - year1 % 10
  const decadeFirstYear2 = year2 - year2 % 10

  return decadeFirstYear1 === decadeFirstYear2
}

export default isSameDecade
