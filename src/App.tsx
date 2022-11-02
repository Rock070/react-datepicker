import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import Calendar from '@/components/Organisms/Calendar'
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
        {/* <div>{{ date }}</div> */}
        {/* @ts-expect-error */}
        <div>{date?.[0]?.toLocaleDateString()} - {date?.[1]?.toLocaleDateString()}</div>

        <h2>mode: {mode}</h2>
        <select
          onChange={onChangeMode}
          value={mode}
        >
          <option value={Mode.DatePicker}>DatePicker</option>
          <option value={Mode.DateRange}>DateRange</option>
        </select>
        <Calendar
          date={mode & Mode.DatePicker ? date : rangeDate}
          setDate={mode & Mode.DatePicker ? setDate : setRangeDate}
          mode={mode}
        />
      </div>
    </div>
  )
}

export default App
