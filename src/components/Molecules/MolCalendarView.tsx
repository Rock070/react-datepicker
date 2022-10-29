import React, { useEffect, useRef, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { CALENDER_HEADER, MONTH_NAMES, DAYS_NUM_IN_ONE_ROW } from '@/helpers/const'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'
import isSameTimestamp from '@/utils/time/isSameTimestamp'
import { get } from '@/utils/time/get'
import splitGroup from '@/utils/splitGroup'
import throttle from '@/utils/throttle'
import pipe from '@/utils/pipe'

import getCalendar from '@/helpers/getCalendar'
import getWheelXDirection from '@/helpers/getWheelXDirection'
import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'
import { ViewMode, WheelDirection } from '@/types'

import type { DateBtn } from '@/types'

interface MolCalendarBodyProps {
  date: Date
  displayDate: Date
  setDisplayDate: (date: Date) => void
  selectDate: (date: Date) => void
}

const wheelHandler = (date: Date, setDisplayDate: (date: Date) => void) => throttle((event: WheelEvent) => {
// const wheelHandler = throttle((event: WheelEvent) => {
  console.log(123)
  const direction = getWheelXDirection(event)
  if (direction === WheelDirection.LEFT) {
    console.log('left')
    setDisplayDate(minus(date, { months: 1 }))
  } else if (direction === WheelDirection.RIGHT) {
    setDisplayDate(add(date, { months: 1 }))
    console.log('right')
  }
}, 1000)

export function MolCalendarBody (props: MolCalendarBodyProps) {
  const { date, displayDate, setDisplayDate, selectDate } = props

  const calendar = getCalendar(displayDate)
  const Step1Func = (calendar: DateBtn[]) => calendar.map(item => (
    {
      ...item,
      clickFn: () => {
        setDisplayDate(item.date)
        selectDate(item.date)
      }
    }
  ))
  const step2Func = (calendar: DateBtn[]) => splitGroup(calendar, DAYS_NUM_IN_ONE_ROW)
  const pipeLine = pipe(Step1Func, step2Func)

  const calendarDisplay = pipeLine(calendar) as DateBtn[][]

  const tableRef = useRef<HTMLTableElement | null>(null)

  // const wheelExecute = wheelHandler(displayDate, setDisplayDate)

  console.log('outside displayDate', displayDate)
  const wheelHandler = throttle((event: WheelEvent) => {
    // const wheelHandler = throttle((event: WheelEvent) => {
    console.log(123)
    const direction = getWheelXDirection(event)
    if (direction === WheelDirection.LEFT) {
      console.log('left')
      console.log('displayDate', displayDate)
      console.log('minus(displayDate, { months: 1 })', minus(displayDate, { months: 1 }))
      const date = minus(displayDate, { months: 1 })
      setDisplayDate(date)
    } else if (direction === WheelDirection.RIGHT) {
      setDisplayDate(add(displayDate, { months: 1 }))
      console.log('right')
    }
  }, 1000)

  useEffect(() => {
    console.log('effect')
    console.log('effect displayDate', displayDate)
    if (tableRef.current === null) return

    tableRef.current.addEventListener('wheel', wheelHandler, {
      passive: true
    })
    return () => {
      if (tableRef.current === null) return

      tableRef.current.removeEventListener('wheel', wheelHandler)
    }
  }, [])
  return (
    <table ref={tableRef} width="100%" cellPadding="0">
      <thead>
        <tr>
          { CALENDER_HEADER.map(item => <th key={item} className="p-1 m-1" >{ item }</th>) }
        </tr>
      </thead>
      <tbody>
        { calendarDisplay.map((group, index) =>
            <tr key={index} >
              {
                group.map(item =>
                  <td
                    key={ item.timestamp }
                    onClick={item.clickFn}
                    className={
                      `
                        p-1
                        text-center hover:bg-gray-2 rounded-1 cursor-pointer select-none
                        ${!item.isThisMonth ? 'text-gray' : ''}
                        ${isSameTimestamp(item.date, date) ? 'bg-blue' : ''}
                      `
                    }
                  >
                    { item.time.d }
                  </td>
                )
              }
            </tr>
        )}
      </tbody>
    </table>
  )
}

export interface MolCalendarHeaderProps {
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
}

export function MolCalendarHeader (props: MolCalendarHeaderProps) {
  const { displayDate, setDisplayDate, changeViewMode } = props

  const nowYearMonth = useMemo(() => {
    const { y, m } = get(displayDate)

    return `${MONTH_NAMES[m]} ${y}`
  }, [displayDate])

  return (
    <div className="flex justify-between items-center">
      <div>
        <BasicButton onClick={() => setCalculatedTime(displayDate, minus, { months: 1 }, setDisplayDate)}>
          <Icon icon="ant-design:double-left-outlined" />
        </BasicButton>
        <BasicButton onClick={() => setCalculatedTime(displayDate, minus, { years: 1 }, setDisplayDate)}>
          <Icon icon="akar-icons:chevron-left" />
        </BasicButton>
      </div>
      <BasicButton onClick={() => changeViewMode(ViewMode.Month)} >{nowYearMonth}</BasicButton>
      <div>
      <BasicButton onClick={() => setCalculatedTime(displayDate, add, { months: 1 }, setDisplayDate)}>
          <Icon icon="akar-icons:chevron-right" />
        </BasicButton>
        <BasicButton onClick={() => setCalculatedTime(displayDate, add, { years: 1 }, setDisplayDate)}>
          <Icon icon="ant-design:double-right-outlined" />
        </BasicButton>
      </div>
    </div>
  )
}

export default function MolCalendar (props: MolCalendarBodyProps & MolCalendarHeaderProps) {
  const { date, displayDate, selectDate, setDisplayDate, changeViewMode } = props

  return (
    <table width="100%" cellPadding="0">
      <thead>
        <tr>
          <th>
          <MolCalendarHeader
            displayDate={displayDate}
            setDisplayDate={setDisplayDate}
            changeViewMode={changeViewMode}
          />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <MolCalendarBody
              date={date}
              displayDate={displayDate}
              selectDate={selectDate}
              setDisplayDate={setDisplayDate}
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
