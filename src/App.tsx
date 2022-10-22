import { useState } from 'react'
import reactLogo from './assets/react.svg'
import BasicCalendar from '@/components/atoms/BasicCalendar'

function App () {
  const [date, setDate] = useState(new Date());

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className='flex flex-col items-center space-y-5 h-full pt-20'>
        <img src={reactLogo} alt="logo" />
        <div>{date.toLocaleDateString()}</div>
        <BasicCalendar date={date} selectDate={setDate}/>
      </div>
    </div>
  )
}

export default App
