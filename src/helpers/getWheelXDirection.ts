import { WheelDirection } from '@/types'

/**
 * only determine x direction
 */
const getWheelXDirection = (event: WheelEvent) => {
  if (event.deltaX === 0) return WheelDirection.NONE
  if (event.deltaX > 0) return WheelDirection.RIGHT
  if (event.deltaX < 0) return WheelDirection.LEFT
}

export default getWheelXDirection
