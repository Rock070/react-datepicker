import React from 'react'
import { useTableContext } from '@/hooks/useCalendar'

import cx from 'classnames'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'
import BasicTable from '@/components/Atoms/BasicTable'
import MolButtonArrowPair from '@/components/Molecules/MolButtonArrowPair'

export const MolDecadeHeader: React.FC = () => {
  const ctx = useTableContext()
  if (!ctx) return <></>
  const {
    displayDate,
    setDisplayDate,
    decadeHeader
  } = ctx

  return (
    <MolButtonArrowPair
      titleDisabled={true}
      displayTitle={decadeHeader?.displayText ?? ''}
      handler={{
        left: () => setCalculatedTime(displayDate, minus, { years: 100 }, setDisplayDate),
        right: () => setCalculatedTime(displayDate, add, { years: 100 }, setDisplayDate)
      }}
    />
  )
}

export const MolDecadeBody: React.FC = () => {
  const ctx = useTableContext()
  if (!ctx) return <></>

  const { decadeBody } = ctx

  if (decadeBody == null) return <></>

  const { displayDecade } = decadeBody

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
