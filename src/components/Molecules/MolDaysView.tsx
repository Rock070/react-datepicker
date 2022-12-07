import React from 'react'
import { CALENDER_HEADER } from '@/helpers/const'

import cx from 'classnames'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicTable from '@/components/Atoms/BasicTable'
import MolButtonArrowPair from '@/components/Molecules/MolButtonArrowPair'
import { ViewMode, CalendarBtn } from '@/types'

interface MolDayHeaderProps {
  dayHeader: string
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
}

export const MolDayHeader: React.FC<MolDayHeaderProps> = props => {
  const {
    displayDate,
    changeViewMode,
    setDisplayDate,
    dayHeader
  } = props

  return (
    <MolButtonArrowPair
      displayTitle={ dayHeader }
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

interface MolDayBodyProps {
  dayBody: CalendarBtn[][]
}

export const MolDayBody: React.FC<MolDayBodyProps> = props => {
  const { dayBody: calendarDisplay } = props

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
                    role="button"
                    aria-disabled={item.disabled}
                    tabIndex={0}
                    data-cy='mochi-calendar-date'
                    { ...(item.isThisMonth
                      ? {
                          'data-test-id': 'mochi-calendar-this-month-date'
                        }
                      : null)}
                    className={cx(
                      'mochi-p-1 mochi-text-center mochi-cursor-pointer mochi-select-none',
                      {
                        'mochi-text-gray': !item.isThisMonth,
                        'mochi-bg-blue mochi-text-white': !item.disabled && item.isSelected,

                        'mochi-hover:bg-gray-2': !item.isSelected && !item.disabled,

                        'mochi-bg-gray-2': item.isRangeHover,

                        'mochi-calendar-disabled-date': item.disabled
                      }
                    )}
                 >
                   { item?.time?.d }
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

const MolDay: React.FC<MolDayBodyProps & MolDayHeaderProps> = props => {
  return (
    <BasicTable>
      {{
        header: (
          <tr>
            <th>
              <MolDayHeader
                {...props}
              />
            </th>
          </tr>
        ),
        body: (
          <tr>
            <td>
              <MolDayBody
                {...props}
              />
            </td>
          </tr>
        )
      }}
    </BasicTable>
  )
}

export default MolDay
