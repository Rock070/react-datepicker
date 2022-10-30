import { useEffect } from 'react'
// WIP
const useEventListener =
  <
    T extends keyof DocumentAndElementEventHandlersEventMap,
    K extends UIEvent,
    El extends HTMLElement,
    Fn extends (event: K) => void
  >(type: T, el: El, fn: Fn) => {
    useEffect(() => {
      // el.addEventListener(type, (event: K) => fn(event))
      // return el.removeEventListener(type, fn)
    }, [])
  }

export default useEventListener
