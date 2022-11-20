import React from 'react'
import cx from 'classnames'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'
import BasicTable from '@/components/Atoms/BasicTable'
import MolButtonArrowPair from '@/components/Molecules/MolButtonArrowPair'

import { ViewMode, CalendarBtn } from '@/types'

interface MolMonthHeaderProps {
  monthHeader: string
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
}

export const MolMonthHeader: React.FC<MolMonthHeaderProps> = props => {
  const {
    displayDate,
    changeViewMode,
    setDisplayDate,
    monthHeader
  } = props

  return (
    <MolButtonArrowPair
      displayTitle={ monthHeader }
      displayTitleHandler={() => changeViewMode(ViewMode.Year)}
      isDoubleArrow={true}
      handler={{
        doubleLeft: () => setCalculatedTime(displayDate, minus, { years: 10 }, setDisplayDate),
        left: () => setCalculatedTime(displayDate, minus, { years: 1 }, setDisplayDate),
        right: () => setCalculatedTime(displayDate, add, { years: 1 }, setDisplayDate),
        doubleRight: () => setCalculatedTime(displayDate, add, { years: 10 }, setDisplayDate)
      }}
    />
  )
}

interface MolMonthBodyProp {
  monthBody: CalendarBtn[][]
}

export const MolMonthBody: React.FC<MolMonthBodyProp> = props => {
  const { monthBody: displayMonth } = props

  if (displayMonth == null) return <></>

  return (
    <BasicTable>
      {{
        body: (
          <>
            {
            displayMonth.map((group, index) => (
              <tr key={index}>
                {
                  group.map((item, id) => (
                    <td key={id}>
                      <BasicButton
                        onClick={item.clickFn}
                        className={cx(
                          'mochi-w-full mochi-py-3 mochi-text-center',
                          { 'mochi-bg-blue mochi-hover:bg-blue': item.isSelected }
                        )}
                      >
                        { item.text }
                      </BasicButton>
                    </td>
                  ))
                }
              </tr>
            ))
          }
          </>
        )
      }}
    </BasicTable>
  )
}

const MolMonth: React.FC<MolMonthHeaderProps & MolMonthBodyProp> = props => {
  return (
    <BasicTable>
      {{
        header: (
          <tr>
            <th>
              <MolMonthHeader
              { ...props }
            />
            </th>
          </tr>
        ),
        body: (
          <tr>
            <td>
              <MolMonthBody
              { ...props }
            />
            </td>
          </tr>
        )
      }}
    </BasicTable>
  )
}

export default MolMonth
