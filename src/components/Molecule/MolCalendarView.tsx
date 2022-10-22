import { useState } from "react";
import BasicButton from '@/components/atoms/BasicButton'

const enum ViewMode {
  Calendar = 1,
  Year = 1 << 1,
  Decade = 1 << 2,
  Century = 1 << 3,
}

export default function BasicCalendar () {
  const [viewMode, changeViewMode] = useState<ViewMode>(1);

  return (
    <div>
      <div>
        <BasicButton>Calendar</BasicButton> 
      </div>
    </div>
  )
}


/**
 * - 
 * - 考慮時區問題
 * - mode: 單選、多選、range
 * - view 模式:
 *    日曆、年、十年、百年
 * - disabled 日期
 * - 滾輪事件去切換日曆 (https://vuetifyjs.com/en/components/date-pickers/#colors)
 */
