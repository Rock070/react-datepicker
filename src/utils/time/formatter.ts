import { get } from '@/utils/time/get'

const formatter = (date: Date) => {
  const { y, m, d } = get(date)

  return [y, m, d].join('/')
}

export default formatter
