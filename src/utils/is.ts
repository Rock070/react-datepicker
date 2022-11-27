export const isArray = (p: any) => Array.isArray(p)
export const isDate = (val: any) => val instanceof Date
export const isNumber = (val: any): val is number => typeof val === 'number'
