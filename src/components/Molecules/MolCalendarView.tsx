import React, { useEffect, useRef, useMemo } from 'react'
import { useCalendarContext } from '@/hooks/useCalendarContext'
import { Icon } from '@iconify/react'
import { CALENDER_HEADER, MONTH_NAMES, DAYS_NUM_IN_ONE_ROW } from '@/helpers/const'

import cx from 'classnames'

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

// interface MolCalendarBodyProps {
//   date: Date
//   displayDate: Date
//   setDisplayDate: (date: Date) => void
//   setDate: (date: Date) => void
// }

export const MolCalendarBody: React.FC = () => {
  const ctx = useCalendarContext()
  if (!ctx) return <></>
  const { date, displayDate, setDisplayDate, setDate } = ctx
  console.log(date)

  const calendar = getCalendar(displayDate)

  const calendarDisplay = useMemo<DateBtn[][]>(() => {
    const result = calendar.map(item => (
      {
        ...item,
        clickFn: () => {
          setDisplayDate(item.date)
          setDate(item.date)
        },
        mouseFn: () => {
          console.log('mouse')
        },
        isHover: false,
        isSelected: isSameTimestamp(item.date, date)
      }
    ))
    return splitGroup(result, DAYS_NUM_IN_ONE_ROW)
  }, [date])

  const tableRef = useRef<HTMLTableElement | null>(null)

  // useEffect(() => {
  //   if (tableRef.current === null) return

  //   // const wheelHandler = throttle((event: WheelEvent) => {
  //   const wheelHandler = (event: WheelEvent) => {
  //     // console.log(event)
  //     const direction = getWheelXDirection(event)
  //     if (direction === WheelDirection.LEFT) {
  //       console.log(displayDate)
  //       const date = minus(displayDate, { months: 1 })
  //       setDisplayDate(date)
  //     } else if (direction === WheelDirection.RIGHT) {
  //       setDisplayDate(add(displayDate, { months: 1 }))
  //     }
  //   }
  //   // }, 1000)

  //   tableRef.current.addEventListener('wheel', wheelHandler, {
  //     passive: true
  //   })
  //   return () => {
  //     if (tableRef.current === null) return

  //     tableRef.current.removeEventListener('wheel', wheelHandler)
  //   }
  // }, [])

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
                    onMouseEnter={item.mouseFn}
                    className={cx(
                      'p1 text-center rounded-1 cursor-pointer select-none',
                      {
                        'text-gray': !item.isThisMonth,
                        'bg-blue': item.isSelected,

                        'hover:bg-gray-2': !item.isSelected
                      }
                    )}
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

export const MolCalendarHeader: React.FC = () => {
  const ctx = useCalendarContext()
  if (!ctx) return <></>
  const { displayDate, setDisplayDate, changeViewMode } = ctx

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

export default function MolCalendar () {
  return (
    <table width="100%" cellPadding="0">
      <thead>
        <tr>
          <th>
          <MolCalendarHeader />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <MolCalendarBody />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
