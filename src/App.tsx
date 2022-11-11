import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import OrgCalendar from '@/components/Organisms/OrgCalendar'

import { Mode } from '@/types'

const App: React.FC = () => {
  const [date, setDate] = useState(new Date())
  const [multipleDate, setMultipleDate] = useState([new Date()])
  const [rangeDate, setRangeDate] = useState([new Date(), new Date()])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className='flex flex-col items-center space-y-5 h-full pt-20'>
        <img src={reactLogo} alt="logo" />

        <div className="grid grid-cols-2 gap-10 text-center">
          <div>
            <div>Calendar</div>
            <div>{date.toLocaleDateString()}</div>
            <OrgCalendar
              date={date}
              setDate={setDate}
              mode={Mode.DatePicker}
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
            />
          </div>
          <div>
            <div>RangeCalendar</div>
            <div>{rangeDate[0]?.toLocaleDateString()} - {rangeDate[1]?.toLocaleDateString()}</div>
            <OrgCalendar
              date={rangeDate}
              setDate={setRangeDate}
              mode={Mode.DateRange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
