/**
 * @example
 * ```js
 * const today = new Date() // Sun Nov 27 2022 02:56:21 GMT+0800
 * getTheDateStartTime(today) // Sun Nov 27 2022 00:00:00 GMT+0800
 * ```
 */
const getTheDateStartTime = (date: Date) => {
  if (!(date instanceof Date)) {
    console.error(`
      getTheDateStartTime warn, param date need to be Date type.
    `)
    return date
  }
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()
  return new Date(y, m, d)
}

export default getTheDateStartTime
