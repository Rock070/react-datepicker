import React, { useMemo } from 'react'
import { useCalendarContext } from '@/hooks/useCalendarContext'

import cx from 'classnames'
import { Icon } from '@iconify/react'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'
import isSameDecade from '@/utils/time/isSameDecade'

import getCentury from '@/utils/time/getCentury'
import splitGroup from '@/utils/splitGroup'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'

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
    <div className="flex justify-between items-center">
    <div>
      <BasicButton onClick={() => setCalculatedTime(displayDate, minus, { years: 100 }, setDisplayDate)}>
        <Icon icon="akar-icons:chevron-left" />
      </BasicButton>
    </div>
    <BasicButton disabled={true}> {nowDecadeDisplay}</BasicButton>
    <div>
      <BasicButton onClick={() => setCalculatedTime(displayDate, add, { years: 100 }, setDisplayDate)}>
        <Icon icon="akar-icons:chevron-right" />
      </BasicButton>
    </div>
  </div>
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

  return (
    <table width="100%" cellPadding="0">
      <tbody>
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
                          'bg-blue hover:bg-blue': isSameDecade(date, new Date(item.value, 1))
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
      </tbody>
    </table>
  )
}

const MolDecade: React.FC = () => {
  return (
    <table width="100%" cellPadding="0">
      <thead>
        <tr>
          <th>
            <MolDecadeHeader />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <MolDecadeBody />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default MolDecade
