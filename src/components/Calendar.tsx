import React from 'react'
import { observer } from 'mobx-react-lite'
import { Day } from './Day' 
import { getDayRange } from '../lib/lib'

function getDayStyle(total: number, idx: number) {
  const widthPower = idx === 0 ? total - idx - 1 : total - idx
  const width = `${100 / (2 ** widthPower)}%`
  const alpha = 0.9 / (2 ** (total - idx - 1))
  const backgroundColor = `rgba(0, 120, 230, ${alpha})`
  return { backgroundColor, width }
}

function _Calendar() {
  const days = [-3, -2, -1, 0]

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

export const Calendar = observer(_Calendar)