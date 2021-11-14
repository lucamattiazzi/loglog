import React from 'react'
import { BAR_HEIGHT } from '../lib/constants'
import { state } from '../state'
import { Bar, NewEvent } from '../types'

interface DayBarProps {
  bar: Bar
}

export function DayBar(p: DayBarProps) {
  const addNewEvent = (bar: Bar) => () => {
    const event: NewEvent = { ts: bar.start.unix() * 1000 }
    state.createNewEvent(event)
  }

  return (
    <div
      className="w-100 b--black bt bb"
      style={{ height: `${BAR_HEIGHT}px` }}
      onClick={addNewEvent(p.bar)}
    >
      {p.bar.start.format('HH:mm')}
    </div>
  )
}
