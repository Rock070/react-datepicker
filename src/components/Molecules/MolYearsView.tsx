import React, { useMemo } from 'react'
import { useCalendarContext } from '@/hooks/useCalendar'

import cx from 'classnames'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'
import isSameYear from '@/utils/time/isSameYear'
import getDecade from '@/utils/time/getDecade'
import splitGroup from '@/utils/splitGroup'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'
import BasicTable from '@/components/Atoms/BasicTable'
import MolButtonArrowPair from '@/components/Molecules/MolButtonArrowPair'

import { ViewMode } from '@/types'

export const MolYearHeader: React.FC = () => {
  const ctx = useCalendarContext()
  if (!ctx) return <></>
  const { displayDate, setDisplayDate, changeViewMode } = ctx

  const nowDecadeDisplay = useMemo(() => {
    const y = getDecade(displayDate)

    return `${y + 1} - ${y + 10}`
  }, [displayDate])

  return (
    <MolButtonArrowPair
      displayTitle={nowDecadeDisplay}
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
  const ctx = useCalendarContext()
  if (!ctx) return <></>
  const { date, displayDate, setDisplayDate, changeViewMode } = ctx
  const year = getDecade(displayDate)
  const years = Array.from({ length: 10 }, (_, index) => year + index + 1)

  const yearGroup = splitGroup(years, 3)

  const setDisplayYear = (yearVal: number) => {
    const selectYear = new Date(yearVal, 1)
    setDisplayDate(selectYear)
    changeViewMode(ViewMode.Month)
  }

  return (
    <BasicTable>
      {{
        body:
          <>
            {
              yearGroup.map((group, index) => (
                <tr key={index}>
                  {
                    group.map((item, id) => (
                      <td key={id}>
                        <BasicButton
                          onClick={() => setDisplayYear(item)}
                          className={cx(
                            'w-full px-3 py-3 text-center',
                            {
                              'bg-blue hover:bg-blue': isSameYear(date[0], new Date(item, 1))
                            }
                          )}
                        >
                          { item }
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
