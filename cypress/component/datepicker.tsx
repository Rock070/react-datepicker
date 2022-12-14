import React, { useState } from 'react'
import OrgCalendar from '@/components/Organisms/OrgCalendar'
import 'virtual:unocss-devtools'
import 'virtual:uno.css'

import { Mode } from '@/types'

export const disabledDate = (time: Date) => time.getDay() % 2 === 0
export const targetDate = new Date(2022, 11, 9)
const Datepicker: React.FC = () => {
  const [date, setDate] = useState(targetDate)

  return (
    <div className="mochi-w-screen mochi-h-screen mochi-flex mochi-justify-center mochi-items-center">
      <div className='mochi-flex mochi-flex-col mochi-items-center mochi-space-y-5 mochi-h-full mochi-pt-20 mochi-text-center'>
        <img src='/vite.svg' alt="logo" />

        <div>
          <div>Date picker</div>
          <div>{date.toLocaleDateString()}</div>
          <OrgCalendar
              disabledDate={disabledDate}
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
