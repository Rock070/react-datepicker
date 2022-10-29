const throttle = <T extends (...args: any[]) => any,>(fn: T, timeout: number = 33.34) => {
  let timer: ReturnType<typeof setTimeout> | undefined

  return ((...args: any[]) => {
    if (timer) return

    fn(...args)
    timer = setTimeout(() => {
      timer = undefined
    }, timeout)
  }) as T
}

export default throttle
