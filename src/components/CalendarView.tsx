import React from 'react'
import { observer } from 'mobx-react-lite'
import { Day } from './Day' 
import { getDayRange } from '../lib/lib'
import { DAYS_TO_SHOW, DAY_S_WIDTH_PART } from '../lib/constants'

function getDayStyle(total: number, idx: number) {
  const reversedIdx = idx === 0 ? total - idx - 1 : total - idx
  const widthPart = DAY_S_WIDTH_PART ** reversedIdx
  const width = `${100 * widthPart}%`
  const alpha = 0.9 / (2 ** (total - idx - 1))
  const backgroundColor = `rgba(0, 120, 230, ${alpha})`
  return { backgroundColor, width }
}

function _CalendarView() {
  const days = Array(DAYS_TO_SHOW).fill(0).map((_, idx) => idx + 1 - DAYS_TO_SHOW)

  return (
    <div className="w-100 flex-auto flex flex-row">
      {
        days.map((delta, idx) => {
          const style = getDayStyle(days.length, idx)
          const [start, end] = getDayRange(delta)
          return <Day start={start} end={end} key={idx} style={style} />
        })
      }
    </div>
  )
}

export const CalendarView = observer(_CalendarView)