import React, { useRef, useState, useMemo } from 'react'
import { useCalendarContext } from '@/hooks/useCalendarContext'
import { Icon } from '@iconify/react'
import { CALENDER_HEADER, MONTH_NAMES, DAYS_NUM_IN_ONE_ROW } from '@/helpers/const'

import cx from 'classnames'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'
import isSameTimestamp from '@/utils/time/isSameTimestamp'
import { get } from '@/utils/time/get'
import splitGroup from '@/utils/splitGroup'

import getCalendar from '@/helpers/getCalendar'
import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'
import BasicTable from '@/components/Atoms/BasicTable'
import { ViewMode, Mode } from '@/types'

import type { DateBtn } from '@/types'

export const MolCalendarBody: React.FC = () => {
  const ctx = useCalendarContext()
  if (!ctx) return <></>
  const { date, setDate, displayDate, setDisplayDate, mode } = ctx
  const [hoverDate, setHoverDate] = useState(date)

  const isChoosingDateRange = useMemo(() => (Mode.DateRange & mode) && Array.isArray(date) && date[0] !== undefined && date[1] === undefined, [date])
  const isRangeHoverHandler = (itemDate: Date) => {
    if (!isChoosingDateRange) return false
    if (!Array.isArray(date)) return false
    if (hoverDate < date[0]) return itemDate < date[0] && itemDate > hoverDate
    return itemDate > date[0] && itemDate < hoverDate
  }
  const calendarDisplay = useMemo<DateBtn[][]>(() => {
    const result = getCalendar(displayDate).map(item => {
      const isSelected = (function () {
        if (Array.isArray(date) && Mode.DateRange & mode) {
          if (date[0] === undefined) return false
          if (isChoosingDateRange) return isSameTimestamp(item.date, date[0])
          return date[0] <= item.date && item.date <= date[1]
        }

        if (!Array.isArray(date)) return isSameTimestamp(item.date, date)
      }())

      return {
        ...item,
        clickFn: () => {
          setDisplayDate(item.date)
          if (Mode.DateRange & mode && Array.isArray(date)) {
            if (isChoosingDateRange) {
              // @ts-expect-error
              if (item.date < date[0]) setDate([item.date, ...date])
              // @ts-expect-error
              else setDate([...date, item.date])
              // @ts-expect-error
            } else setDate([item.date])
            return
          }
          // @ts-expect-error
          setDate(item.date)
        },
        onMouseEnter: () => {
          setHoverDate(item.date)
        },
        isRangeHover: isRangeHoverHandler(item.date),
        isSelected
      }
    })

    return splitGroup(result, DAYS_NUM_IN_ONE_ROW)
  }, [displayDate, isChoosingDateRange, hoverDate])

  // const isMouseOver = (item: DateBtn): boolean => {
  //   console.log(item)
  //   if (!isChoosingDateRange) return false
  //   if (!Array.isArray(date)) return false
  //   item.isRangeHover = true
  //   console.log(calendarDisplay)
  //   // return itemDate < date[0]

  //   return true
  // }

  const tableRef = useRef<HTMLTableElement | null>(null)

  // useEffect(() => {
  //   if (tableRef.current === null) return

  //   // const wheelHandler = throttle((event: WheelEvent) => {
  //   const wheelHandler = (event: WheelEvent) => {
  //     const direction = getWheelXDirection(event)
  //     if (direction === WheelDirection.LEFT) {
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
    <BasicTable >
      {{
        header: <tr>{ CALENDER_HEADER.map(item => <th key={item} className="p-1 m-1" >{ item }</th>) }</tr>,
        body: <>
          { calendarDisplay.map((group, index) =>
           <tr key={index} >
             {
               group.map(item =>
                 <td
                   key={ item.timestamp }
                   onClick={item.clickFn}
                  onMouseEnter={item.onMouseEnter}
                   className={cx(
                     'p1 text-center cursor-pointer select-none',
                     {
                       'text-gray': !item.isThisMonth,
                       'bg-blue text-white': item.isSelected,

                       'hover:bg-gray-2': !item.isSelected,

                       'bg-gray-2': item.isRangeHover
                     }
                   )}
                 >
                   { item.time.d }
                 </td>
               )
             }
           </tr>
          )}
        </>
      }}
  </BasicTable>
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
    <BasicTable>
      {{
        header: (
          <tr>
            <th>
              <MolCalendarHeader />
            </th>
          </tr>
        ),
        body: (
          <tr>
            <td>
              <MolCalendarBody />
            </td>
          </tr>
        )
      }}
    </BasicTable>
  )
}
