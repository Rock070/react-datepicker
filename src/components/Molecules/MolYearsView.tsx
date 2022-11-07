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

export const MolYearHeader: React.FC = () => {
  const ctx = useTableContext()
  if (!ctx) return <></>
  const {
    displayDate,
    changeViewMode,
    setDisplayDate,
    yearHeader
  } = ctx

  return (
    <MolButtonArrowPair
      displayTitle={yearHeader?.displayText ?? ''}
      displayTitleHandler={() => changeViewMode(ViewMode.Decade)}
      isDoubleArrow={true}
      handler={{
        doubleLeft: () => setCalculatedTime(displayDate, minus, { years: 100 }, setDisplayDate),
        left: () => setCalculatedTime(displayDate, minus, { years: 10 }, setDisplayDate),
        right: () => setCalculatedTime(displayDate, add, { years: 10 }, setDisplayDate),
        doubleRight: () => setCalculatedTime(displayDate, add, { years: 100 }, setDisplayDate)
      }}
    />
  )
}

export const MolYearBody: React.FC = () => {
  const ctx = useTableContext()
  if (!ctx) return <></>

  const { yearBody } = ctx

  if (yearBody == null) return <></>

  const { displayYear } = yearBody

  return (
    <BasicTable>
      {{
        body:
          <>
            {
              displayYear.map((group, index) => (
                <tr key={index}>
                  {
                    group.map((item, id) => (
                      <td key={id}>
                        <BasicButton
                          onClick={item.clickFn}
                          className={cx(
                            'w-full px-3 py-3 text-center',
                            {
                              'bg-blue hover:bg-blue': item.isSelected
                            }
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
      }}
    </BasicTable>
  )
}

const MolYear: React.FC = () => {
  return (
    <BasicTable>
      {{
        header: (
          <tr>
            <th>
              <MolYearHeader />
            </th>
          </tr>
        ),
        body: (
          <tr>
            <td>
              <MolYearBody />
            </td>
          </tr>
        )
      }}
    </BasicTable>
  )
}

export default MolYear
