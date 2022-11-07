import React from 'react'
import { useTableContext } from '@/hooks/useCalendar'
import { CALENDER_HEADER } from '@/helpers/const'

import cx from 'classnames'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicTable from '@/components/Atoms/BasicTable'
import MolButtonArrowPair from '@/components/Molecules/MolButtonArrowPair'
import { ViewMode } from '@/types'

export const MolCalendarBody: React.FC = () => {
  const ctx = useTableContext()
  if (!ctx) return <></>

  const { dayBody: calendarDisplay } = ctx

  if (calendarDisplay == null) return <></>

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
  const ctx = useTableContext()
  if (!ctx) return <></>
  const {
    displayDate,
    changeViewMode,
    setDisplayDate,
    dayHeader
  } = ctx
  return (
    <MolButtonArrowPair
      displayTitle={ dayHeader?.displayText ?? '' }
      displayTitleHandler={() => changeViewMode(ViewMode.Month)}
      isDoubleArrow={true}
      handler={{
        doubleLeft: () => setCalculatedTime(displayDate, minus, { years: 1 }, setDisplayDate),
        left: () => setCalculatedTime(displayDate, minus, { months: 1 }, setDisplayDate),
        right: () => setCalculatedTime(displayDate, add, { months: 1 }, setDisplayDate),
        doubleRight: () => setCalculatedTime(displayDate, add, { years: 1 }, setDisplayDate)
      }}
    />
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
