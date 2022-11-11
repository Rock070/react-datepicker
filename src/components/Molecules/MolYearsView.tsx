import React from 'react'

import cx from 'classnames'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'
import BasicTable from '@/components/Atoms/BasicTable'
import MolButtonArrowPair from '@/components/Molecules/MolButtonArrowPair'

import { ViewMode, CalendarBtn } from '@/types'

interface MolYearHeaderProps {
  yearHeader: string
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
}

export const MolYearHeader: React.FC<MolYearHeaderProps> = props => {
  const {
    displayDate,
    changeViewMode,
    setDisplayDate,
    yearHeader
  } = props

  return (
    <MolButtonArrowPair
      displayTitle={yearHeader}
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

interface MolYearBodyProp {
  yearBody: CalendarBtn[][]
}

export const MolYearBody: React.FC<MolYearBodyProp> = props => {
  const { yearBody: displayYear } = props

  if (displayYear == null) return <></>

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

const MolYear: React.FC<MolYearHeaderProps & MolYearBodyProp> = props => {
  return (
    <BasicTable>
      {{
        header: (
          <tr>
            <th>
              <MolYearHeader
                { ...props }
              />
            </th>
          </tr>
        ),
        body: (
          <tr>
            <td>
              <MolYearBody
                { ...props }
              />
            </td>
          </tr>
        )
      }}
    </BasicTable>
  )
}

export default MolYear
