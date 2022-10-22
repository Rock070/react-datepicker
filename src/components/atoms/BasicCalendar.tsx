import { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { CALENDER_HEADER } from '@/helpers/const';
import add from '@/utils/time/add';
import minus from '@/utils/time/minus';

import getCalendar from '@/helpers/getCalendar'
import { get } from '@/utils/time/get';

import BasicButton from '@/components/atoms/BasicButton'
const enum ViewMode {
  Calendar = 1,
  Year = 1 << 1,
  Decade = 1 << 2,
  Century = 1 << 3,
}

interface CalendarBodyProps {
  date: Date;
}

function CalendarBody (props: CalendarBodyProps) {
  const{ date } = props;

  const calendar = getCalendar(date);

  return (
    <table>
      <thead>
        <tr>
          { CALENDER_HEADER.map(item => <th key={item} >{ item }</th>) }
        </tr>
      </thead>
      <tbody>
        { calendar.map((group, index) =>
            <tr key={index} >
              {
                group.map(item =>
                  <td
                    key={ item.timestamp }
                    className={
                      `
                        p-2 text-center hover:bg-gray-3 rounded-2 cursor-pointer select-none
                        ${!item.isThisMonth && 'text-gray'}
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


export default function BasicCalendar () {
  const [viewMode, changeViewMode] = useState<ViewMode>(1);
  const [date, changeDate] = useState<Date>(new Date());
  const nowYearMonth = useMemo(() => {
    const { y, m } = get(date);
    return `${y} ${m + 1}`
  }, [date])

  const clickLastMonth = () => {
    changeDate(minus(date, { months: 1 }))
  }

  const clickLastYear = () => {
    changeDate(minus(date, { years: 1 }))
  }

  const clickNextMonth = () => {
    changeDate(add(date, { months: 1 }))
  }

  const clickNextYear = () => {
    changeDate(add(date, { years: 1 }))
  }

  const selectedDate = '';

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
        <CalendarBody date={date} />
      </div>
    </div>
  )
}
