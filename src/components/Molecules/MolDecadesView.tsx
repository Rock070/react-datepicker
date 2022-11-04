import React, { useMemo } from 'react'
import { useCalendarContext } from '@/hooks/useCalendar'

import cx from 'classnames'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'
import isSameDecade from '@/utils/time/isSameDecade'

import getCentury from '@/utils/time/getCentury'
import splitGroup from '@/utils/splitGroup'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'
import BasicTable from '@/components/Atoms/BasicTable'
import MolButtonArrowPair from '@/components/Molecules/MolButtonArrowPair'

import { ViewMode } from '@/types'

export const MolDecadeHeader: React.FC = () => {
  const ctx = useCalendarContext()
  if (!ctx) return <></>
  const { displayDate, setDisplayDate } = ctx

  const nowDecadeDisplay = useMemo(() => {
    const y = getCentury(displayDate)

    return `${y + 1} - ${y + 100}`
  }, [displayDate])

  return (
    <MolButtonArrowPair
      titleDisabled={true}
      displayTitle={nowDecadeDisplay}
      handler={{
        left: () => setCalculatedTime(displayDate, minus, { years: 100 }, setDisplayDate),
        right: () => setCalculatedTime(displayDate, add, { years: 100 }, setDisplayDate)
      }}
    />
  )
}

export const MolDecadeBody: React.FC = () => {
  const ctx = useCalendarContext()
  if (!ctx) return <></>
  const { date, displayDate, setDisplayDate, changeViewMode } = ctx

  const year = getCentury(displayDate)
  const years = Array.from({ length: 10 }, (_, index) => {
    const RATE = 10

    return {
      value: year + index * RATE,
      text: `${(year + index * RATE) + 1} - ${year + ((index + 1) * RATE)}`
    }
  })

  const yearGroup = splitGroup(years, 3)

  const setDisplayDecade = (yearVal: number) => {
    const selectDecade = new Date(yearVal, 1)
    setDisplayDate(selectDecade)
    changeViewMode(ViewMode.Year)
  }

  const getIsSelected = (itemDate: Date) => {
    if (!Array.isArray(date)) return isSameDecade(date, itemDate)

    if (date[0] === undefined) return false
    if (date[1] === undefined) return isSameDecade(date[0], itemDate)
    return date[0] <= itemDate && itemDate <= date[1]
  }

  return (
    <BasicTable>
    {{
      body:
        <>
          { yearGroup.map((group, index) => (
            <tr key={index}>
              {
                group.map((item, id) => (
                  <td key={id}>
                    <BasicButton
                      onClick={() => setDisplayDecade(item.value)}
                      className={cx(
                        'w-full px-3 py-3 text-center',
                        {
                          'bg-blue hover:bg-blue': getIsSelected(new Date(item.value, 1))
                        }
                      )}
                    >
                      { item.text }
                    </BasicButton>
                  </td>
                ))
              }
            </tr>
          ))}
        </>
    }}
  </BasicTable>
  )
}

const MolDecade: React.FC = () => {
  return (
    <BasicTable>
      {{
        header:
          <tr>
            <th>
              <MolDecadeHeader />
            </th>
          </tr>,
        body:
          <tr>
            <td>
              <MolDecadeBody />
            </td>
          </tr>
      }}
  </BasicTable>
  )
}

export default MolDecade
