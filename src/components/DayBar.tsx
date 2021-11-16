import React from 'react'
import { BAR_HEIGHT } from '../lib/constants'
import { state } from '../state'
import { Bar, BabyEvent } from '../types'

interface DayBarProps {
  bar: Bar
  backgroundColor: string
}

export function DayBar(p: DayBarProps) {
  
  const addNewEvent = (bar: Bar) => () => {
    const partialEvent: Partial<BabyEvent> = { type: 'food', ts: bar.start.unix() * 1000, amount: 100 }
    state.createNewEvent(partialEvent)
  }

  return (
    <div
      className="w-100 flex items-start justify-center"
      style={{
        height: `${BAR_HEIGHT}px`,
      }}
      onClick={addNewEvent(p.bar)}
    >
      <span className="hour w-100 flex items-center monospace f6" style={{ transform: 'translateY(-50%)'}}>
        {p.bar.start.format('HH:mm')}
      </span>
    </div>
  )
}
