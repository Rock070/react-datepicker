/**
 * @example
 * ```js
 * getCentury(new Date(2029, 10, 2))
 * // 2000
 * ```
 */
function getCentury (date: Date) {
  const year = date.getFullYear()
  const digit = year % 100

  return year - digit
}

export default getCentury
