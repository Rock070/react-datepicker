import React, { useState } from 'react'
import OrgCalendar from '@/components/Organisms/OrgCalendar'

import { Mode } from '@/types'

const Datepicker: React.FC = () => {
  const [date, setDate] = useState(new Date())

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className='flex flex-col items-center space-y-5 h-full pt-20 text-center'>
        <img src='/vite.svg' alt="logo" />

        <div>
          <div>Date picker</div>
          <div>{date.toLocaleDateString()}</div>
          <OrgCalendar
              date={date}
              setDate={setDate}
              mode={Mode.DatePicker}
            />
        </div>
      </div>
    </div>
  )
}

export default Datepicker
