import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import OrgCalendar from '@/components/Organisms/OrgCalendar'

import { Mode } from '@/types'

const App: React.FC = () => {
  const [date, setDate] = useState(new Date())
  const [multipleDate, setMultipleDate] = useState([new Date()])
  const [rangeDate, setRangeDate] = useState([new Date(), new Date()])

  const disabledDate = (date: Date) => {
    // return date.getDay() === 2
    return date.getTime() < Date.now()
  }

  return (
    <div className="mochi-w-screen mochi-h-screen mochi-flex mochi-justify-center mochi-items-center">
      <div className='mochi-flex mochi-flex-col mochi-items-center mochi-space-y-5 mochi-h-full mochi-pt-20'>
        <img src={reactLogo} alt="logo" />

        <div className="mochi-grid mochi-grid-cols-2 mochi-gap-10 mochi-text-center">
          <div>
            <div>Calendar</div>
            <div>{date.toLocaleDateString()}</div>
            <OrgCalendar
              date={date}
              setDate={setDate}
              mode={Mode.DatePicker}
              disabledDate={disabledDate}
            />
          </div>
          <div>
            <div>Calendar Multiple</div>
            <div className="space-x-1 break-all max-w-350px">
              {
              multipleDate.map((item, index) => {
                return <span key={item.toLocaleDateString()}>{ index !== 0 && ','} {item.toLocaleDateString()}</span>
              })
            }
            </div>
            <OrgCalendar
              date={multipleDate}
              setDate={setMultipleDate}
              mode={Mode.DatePickerMultiple}
              disabledDate={disabledDate}
            />
          </div>
          <div>
            <div>RangeCalendar</div>
            <div>{rangeDate[0]?.toLocaleDateString()} - {rangeDate[1]?.toLocaleDateString()}</div>
            <OrgCalendar
              date={rangeDate}
              setDate={setRangeDate}
              mode={Mode.DateRange}
              disabledDate={disabledDate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
