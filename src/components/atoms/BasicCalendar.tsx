import { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { CALENDER_HEADER, MONTH_NAMES, DAYS_NUM_IN_ONE_ROW } from '@/helpers/const';

import add from '@/utils/time/add';
import minus from '@/utils/time/minus';
import isSame from '@/utils/time/isSame';
import splitGroup from '@/utils/splitGroup';
import pipe from '@/utils/pipe';

import getCalendar from '@/helpers/getCalendar'
import { get } from '@/utils/time/get';

import BasicButton from '@/components/atoms/BasicButton'

import type { DateBtn } from '@/types';

const enum ViewMode {
  Calendar = 1,
  Year = 1 << 1,
  Decade = 1 << 2,
  Century = 1 << 3,
}

interface CalendarBodyProps {
  date: Date;
  displayDate: Date;
  selectDate: (date: Date) => void;
}

function CalendarBody (props: CalendarBodyProps) {
  const{ date, displayDate, selectDate } = props;

  const calendar = getCalendar(displayDate);
  const Step1Func = (calendar: DateBtn[]) => calendar.map(item => (
    {
      ...item,
      clickFn: () => selectDate(item.date)
    }
  ))
  const step2Func = (calendar: DateBtn[]) => splitGroup(calendar, DAYS_NUM_IN_ONE_ROW)
  const pipeLine = pipe(Step1Func, step2Func)

  const calendarDisplay = pipeLine(calendar) as DateBtn[][];

  return (
    <table>
      <thead>
        <tr>
          { CALENDER_HEADER.map(item => <th key={item} className="p-1 m-1" >{ item }</th>) }
        </tr>
      </thead>
      <tbody>
        { calendarDisplay.map((group, index) =>
            <tr key={index} >
              {
                group.map(item =>
                  <td
                    key={ item.timestamp }
                    onClick={item.clickFn}
                    className={
                      `
                        p-1 m-1
                        text-center hover:bg-gray-3 rounded-1 cursor-pointer select-none
                        ${!item.isThisMonth && 'text-gray'}
                        ${isSame(item.date, date) && 'bg-blue' }
                      `
                    }
                  >
                    { item.time.d }
                  </td>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

export interface BasicCalendarProps {
  date: Date;
  selectDate: (date: Date) => void;
}

export default function BasicCalendar (props: BasicCalendarProps) {
  const { date, selectDate } = props;

  const [displayDate, setDisplayDate] = useState(date);

  const [viewMode, changeViewMode] = useState<ViewMode>(1);
  const nowYearMonth = useMemo(() => {
    const { y, m } = get(displayDate);

    return `${MONTH_NAMES[m]} ${y}`
  }, [displayDate])

  const clickLastMonth = () => {
    setDisplayDate(minus(displayDate, { months: 1 }))
  }

  const clickLastYear = () => {
    setDisplayDate(minus(displayDate, { years: 1 }))
  }

  const clickNextMonth = () => {
    setDisplayDate(add(displayDate, { months: 1 }))
  }

  const clickNextYear = () => {
    setDisplayDate(add(displayDate, { years: 1 }))
  }


  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <BasicButton onClick={clickLastYear}>
              <Icon icon="ant-design:double-left-outlined" />
            </BasicButton>
            <BasicButton onClick={clickLastMonth}>
              <Icon icon="akar-icons:chevron-left" />
            </BasicButton>
          </div>
          <BasicButton>{nowYearMonth}</BasicButton>
          <div>
            <BasicButton onClick={clickNextMonth}>
              <Icon icon="akar-icons:chevron-right" />
            </BasicButton>
            <BasicButton onClick={clickNextYear}>
              <Icon icon="ant-design:double-right-outlined" />
            </BasicButton>
          </div>
        </div>
        <CalendarBody date={date} displayDate={displayDate} selectDate={selectDate} />
      </div>
    </div>
  )
}
