import React, { useState, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { CALENDER_HEADER, DAYS_NUM_IN_ONE_ROW, MONTH_NAMES } from '@/helpers/const'

import add from '@/utils/time/add'
import minus from '@/utils/time/minus'
import isSameYear from '@/utils/time/isSameYear'
import isSameMonth from '@/utils/time/isSameMonth'
import { get } from '@/utils/time/get'
import splitGroup from '@/utils/splitGroup'
import pipe from '@/utils/pipe'

import setCalculatedTime from '@/helpers/setCalculatedTime'

import BasicButton from '@/components/Atoms/BasicButton'

import { ViewMode } from '@/types'

interface MolMonthHeaderProps {
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
}

export function MolMonthHeader (props: MolMonthHeaderProps) {
  const { displayDate, setDisplayDate, changeViewMode } = props

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

interface MolMonthBodyProps {
  date: Date
  displayDate: Date
  setDisplayDate: (date: Date) => void
  changeViewMode: (mode: ViewMode) => void
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

export function MolMonthBody (props: MolMonthBodyProps) {
  const { date, displayDate, setDisplayDate, changeViewMode } = props

  const { y } = get(displayDate)
  const setDisplayMonth = (monthVal: number) => {
    const selectMonth = new Date(y, monthVal)
    setDisplayDate(selectMonth)
    changeViewMode(ViewMode.Calendar)
  }

  return (
    <table>
      <tbody>
          { monthGroup.map((group, index) => (
            <tr key={index}>
              {
                group.map((item, id) => (
                  <td key={id}>
                    <BasicButton
                      onClick={() => setDisplayMonth(item.value)}
                      className={`
                        w-full px-3 py-3 text-center
                        ${isSameYearMonth(date, new Date(y, item.value)) ? 'bg-blue hover:bg-blue' : ''}
                      `}
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

export default function MolMonth (props: MolMonthBodyProps & MolMonthHeaderProps) {
  const { date, displayDate, setDisplayDate, changeViewMode } = props

  return (
    <>
      <MolMonthHeader
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
        changeViewMode={changeViewMode}
      />
      <MolMonthBody
        date={date}
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
        changeViewMode={changeViewMode}
      />
    </>
  )
}
