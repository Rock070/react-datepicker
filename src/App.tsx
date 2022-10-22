import { useState } from 'react'
import reactLogo from './assets/react.svg'
import BasicCalendar from '@/components/atoms/BasicCalendar'

function App () {
  const [count, setCount] = useState(0)

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className='flex flex-col items-center space-y-5'>
        <img src={reactLogo} alt="logo" />
        <BasicCalendar />
      </div>
    </div>
  )
}

export default App
