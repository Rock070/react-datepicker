/**
 * @example
 * ```js
 * getDecade(new Date(2029, 10, 2))
 * // 2020
 * ```
 */
function getDecade (date: Date) {
  const year = date.getFullYear()
  const digit = year % 10

  return year - digit
}

export default getDecade
