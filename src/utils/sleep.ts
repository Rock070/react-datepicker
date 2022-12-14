const sleep = (s: number) => {
  return new Promise(resolve => setTimeout(() => { resolve(true) }, s))
}

export default sleep
