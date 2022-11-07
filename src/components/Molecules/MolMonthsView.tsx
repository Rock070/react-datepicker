import React from 'react'
import { useTableContext } from '@/hooks/useCalendar'
import cx from 'classnames'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'
import BasicTable from '@/components/Atoms/BasicTable'
import MolButtonArrowPair from '@/components/Molecules/MolButtonArrowPair'

import { ViewMode } from '@/types'

export const MolMonthHeader: React.FC = () => {
  const ctx = useTableContext()
  if (!ctx) return <></>
  const {
    displayDate,
    changeViewMode,
    setDisplayDate,
    monthHeader
  } = ctx

  return (
    <MolButtonArrowPair
      displayTitle={monthHeader?.displayText ?? ''}
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

export const MolMonthBody: React.FC = () => {
  const ctx = useTableContext()
  if (!ctx) return <></>

  const { monthBody } = ctx

  if (monthBody == null) return <></>

  const { displayMonth } = monthBody

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
                          'w-full py-3 text-center',
                          { 'bg-blue hover:bg-blue': item.isSelected }
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

const MolMonth: React.FC = () => {
  return (
    <BasicTable>
    {{
      header: (
        <tr>
          <th>
            <MolMonthHeader/>
          </th>
        </tr>
      ),
      body: (
        <tr>
          <td>
            <MolMonthBody />
        </td>
      </tr>
      )
    }}
    </BasicTable>
  )
}

export default MolMonth
