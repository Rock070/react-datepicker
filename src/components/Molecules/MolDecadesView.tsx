import React from 'react'

import cx from 'classnames'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'
import BasicTable from '@/components/Atoms/BasicTable'
import MolButtonArrowPair from '@/components/Molecules/MolButtonArrowPair'

import type { CalendarBtn } from '@/types'

interface MolDecadeHeaderProps {
  decadeHeader: string
  displayDate: Date
  setDisplayDate: (date: Date) => void
}

export const MolDecadeHeader: React.FC<MolDecadeHeaderProps> = props => {
  const {
    displayDate,
    setDisplayDate,
    decadeHeader
  } = props

  return (
    <MolButtonArrowPair
      titleDisabled={true}
      displayTitle={decadeHeader}
      handler={{
        left: () => setCalculatedTime(displayDate, minus, { years: 100 }, setDisplayDate),
        right: () => setCalculatedTime(displayDate, add, { years: 100 }, setDisplayDate)
      }}
    />
  )
}
interface MolDecadeBodyProp {
  decadeBody: CalendarBtn[][]
}

export const MolDecadeBody: React.FC<MolDecadeBodyProp> = props => {
  const { decadeBody: displayDecade } = props

  if (displayDecade == null) return <></>

  return (
    <BasicTable>
    {{
      body:
        <>
          { displayDecade.map((group, index) => (
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
          ))}
        </>
    }}
  </BasicTable>
  )
}

const MolDecade: React.FC<MolDecadeHeaderProps & MolDecadeBodyProp> = props => {
  return (
    <BasicTable>
      {{
        header:
          <tr>
            <th>
              <MolDecadeHeader
                { ...props }
              />
            </th>
          </tr>,
        body:
          <tr>
            <td>
              <MolDecadeBody
                { ...props }
              />
            </td>
          </tr>
      }}
  </BasicTable>
  )
}

export default MolDecade
