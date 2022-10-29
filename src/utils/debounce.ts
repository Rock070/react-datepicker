const debounce = <T extends (...args: any[]) => any,>(fn: T, timeout: number = 33.34) => {
  let timer: ReturnType<typeof setTimeout> | null

  return ((...args: any[]) => {
    if (timer != null) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), timeout)
  }) as T
}

export default debounce
