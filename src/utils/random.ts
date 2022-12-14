import { isNumber } from './is'
function random (upper: number): number
function random (lower: number, upper: number): number
function random (...arg: number[]): number {
  let upper, lower

  const isRange = isNumber(arg[0]) && isNumber(arg[1])

  if (isRange) [lower, upper] = arg
  else [lower, upper] = [0, ...arg]

  const result = Math.floor(Math.random() * (upper - lower + 1)) + lower

  return result
}

export default random
