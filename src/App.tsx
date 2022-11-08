import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import OrgCalendar from '@/components/Organisms/OrgCalendar'

import { Mode } from '@/types'

const App: React.FC = () => {
  const [mode, changeMode] = useState<Mode>(Mode.DateRange)
  const onChangeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as unknown as Mode
    changeMode(value)
  }
  const [date, setDate] = useState(new Date())
  const [rangeDate, setRangeDate] = useState([new Date(), new Date()])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className='flex flex-col items-center space-y-5 h-full pt-20'>
        <img src={reactLogo} alt="logo" />

        <h2>mode: {mode}</h2>
        <select
          onChange={onChangeMode}
          value={mode}
        >
          <option value={Mode.DatePicker}>DatePicker</option>
          <option value={Mode.DateRange}>DateRange</option>
        </select>
        <div className="flex space-x-10 text-center">
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
