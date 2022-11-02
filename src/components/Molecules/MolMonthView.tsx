import React, { useMemo } from 'react'
import { useCalendarContext } from '@/hooks/useCalendarContext'
import { Icon } from '@iconify/react'
import cx from 'classnames'
import { MONTH_NAMES } from '@/helpers/const'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'
import isSameYear from '@/utils/time/isSameYear'
import isSameMonth from '@/utils/time/isSameMonth'
import { get } from '@/utils/time/get'
import splitGroup from '@/utils/splitGroup'
import pipe from '@/utils/pipe'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'
import BasicTable from '@/components/Atoms/BasicTable'

import { ViewMode } from '@/types'

export const MolMonthHeader: React.FC = () => {
  const ctx = useCalendarContext()
  if (!ctx) return <></>
  const { displayDate, setDisplayDate, changeViewMode } = ctx

  const nowYear = useMemo(() => {
    const { y } = get(displayDate)

    return `${y}`
  }, [displayDate])

  return (
    <div className="flex justify-between items-center">
    <div>
      <BasicButton onClick={() => setCalculatedTime(displayDate, minus, { years: 10 }, setDisplayDate)}>
        <Icon icon="ant-design:double-left-outlined" />
      </BasicButton>
      <BasicButton onClick={() => setCalculatedTime(displayDate, minus, { years: 1 }, setDisplayDate)}>
        <Icon icon="akar-icons:chevron-left" />
      </BasicButton>
    </div>
    <BasicButton onClick={() => changeViewMode(ViewMode.Year)} >{nowYear}</BasicButton>
    <div>
    <BasicButton onClick={() => setCalculatedTime(displayDate, add, { years: 1 }, setDisplayDate)}>
        <Icon icon="akar-icons:chevron-right" />
      </BasicButton>
      <BasicButton onClick={() => setCalculatedTime(displayDate, add, { years: 10 }, setDisplayDate)}>
        <Icon icon="ant-design:double-right-outlined" />
      </BasicButton>
    </div>
  </div>
  )
}
interface TransformMonth {
  value: number
  text: string
}

const transformMonth = (months: string[]): TransformMonth[] => {
  return months.map((m, index) => (
    {
      value: index,
      text: m
    }
  ))
}

const split = (months: TransformMonth[]) => splitGroup(months, 3)

const pipeLine = pipe(transformMonth, split)

const monthGroup = pipeLine(MONTH_NAMES) as TransformMonth[][]

const isSameYearMonth = (date1: Date, date2: Date) => {
  return isSameYear(date1, date2) && isSameMonth(date1, date2)
}

export const MolMonthBody: React.FC = () => {
  const ctx = useCalendarContext()
  if (!ctx) return <></>
  const { date, displayDate, setDisplayDate, changeViewMode } = ctx

  const { y } = get(displayDate)
  const setDisplayMonth = (monthVal: number) => {
    const selectMonth = new Date(y, monthVal)
    setDisplayDate(selectMonth)
    changeViewMode(ViewMode.Calendar)
  }

  return (
    <BasicTable>
    {{
      body: (
        <>
          {
            monthGroup.map((group, index) => (
              <tr key={index}>
                {
                  group.map((item, id) => (
                    <td key={id}>
                      <BasicButton
                        onClick={() => setDisplayMonth(item.value)}
                        className={cx(
                          'w-full py-3 text-center',
                          { 'bg-blue hover:bg-blue': isSameYearMonth(date[0], new Date(y, item.value)) }
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
