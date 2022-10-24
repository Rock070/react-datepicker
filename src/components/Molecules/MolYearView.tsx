import React, { useMemo } from 'react'
import cx from 'classNames'
import { Icon } from '@iconify/react'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'
import isSameYear from '@/utils/time/isSameYear'
import getDecade from '@/utils/time/getDecade'
import splitGroup from '@/utils/splitGroup'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'

import { ViewMode } from '@/types'

interface MolYearHeaderProps {
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
}

export const MolYearHeader: React.FC<MolYearHeaderProps> = (props) => {
  const { displayDate, setDisplayDate, changeViewMode } = props

  const nowDecadeDisplay = useMemo(() => {
    const y = getDecade(displayDate)

    return `${y + 1} - ${y + 10}`
  }, [displayDate])

  return (
    <div className="flex justify-between items-center">
    <div>
      <BasicButton onClick={() => setCalculatedTime(displayDate, minus, { years: 100 }, setDisplayDate)}>
        <Icon icon="ant-design:double-left-outlined" />
      </BasicButton>
      <BasicButton onClick={() => setCalculatedTime(displayDate, minus, { years: 10 }, setDisplayDate)}>
        <Icon icon="akar-icons:chevron-left" />
      </BasicButton>
    </div>
    <BasicButton onClick={() => changeViewMode(ViewMode.Decade)}> {nowDecadeDisplay}</BasicButton>
    <div>
    <BasicButton onClick={() => setCalculatedTime(displayDate, add, { years: 10 }, setDisplayDate)}>
        <Icon icon="akar-icons:chevron-right" />
      </BasicButton>
      <BasicButton onClick={() => setCalculatedTime(displayDate, add, { years: 100 }, setDisplayDate)}>
        <Icon icon="ant-design:double-right-outlined" />
      </BasicButton>
    </div>
  </div>
  )
}

interface MolYearBodyProps {
  date: Date
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
}

export const MolYearBody: React.FC<MolYearBodyProps> = (props) => {
  const { date, displayDate, setDisplayDate, changeViewMode } = props
  const year = getDecade(displayDate)
  const years = Array.from({ length: 10 }, (_, index) => year + index + 1)

  const yearGroup = splitGroup(years, 3)

  const setDisplayYear = (yearVal: number) => {
    const selectYear = new Date(yearVal, 1)
    setDisplayDate(selectYear)
    changeViewMode(ViewMode.Month)
  }

  return (
    <table width="100%">
      <tbody>
          { yearGroup.map((group, index) => (
            <tr key={index}>
              {
                group.map((item, id) => (
                  <td key={id}>
                    <BasicButton
                      onClick={() => setDisplayYear(item)}
                      className={cx(
                        'w-full px-3 py-3 text-center',
                        {
                          'bg-blue hover:bg-blue': isSameYear(date, new Date(item, 1))
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
      </tbody>
    </table>
  )
}

const MolYear: React.FC<MolYearBodyProps & MolYearHeaderProps> = (props) => {
  const { date, displayDate, setDisplayDate, changeViewMode } = props

  return (
    <table>
      <thead>
        <tr>
          <th>
            <MolYearHeader
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              changeViewMode={changeViewMode}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <MolYearBody
              date={date}
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              changeViewMode={changeViewMode}
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default MolYear
