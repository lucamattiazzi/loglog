import { observer } from 'mobx-react-lite'
import React from 'react'
import dayjs from 'dayjs'

import { DayBar } from './DayBar'
import { DayEvent } from './DayEvent'
import { state } from '../state'
import { Bar } from '../types'

interface DayProps {
  start: number
  end: number
  style: Record<string, string|number>
}

export function getBars(ts: number): Bar[] {
  const bars = Array(24).fill(0).map((_, idx) => {
    const start = dayjs(ts).startOf('day').add(idx, 'hours')
    const end = start.add(1, 'hours')
    return { start, end }
  })
  return bars
}

function _Day(p: DayProps) {
  const bars = getBars(p.start)
  const events = state.events.filter(e => 
    e.type === 'food' ? e.ts > p.start && e.ts < p.end : e.start > p.start && e.end < p.end
  ) || []

  const foodEvents = events.filter(e => e.type === 'food')
  const sleepEvents = events.filter(e => e.type === 'sleep')

  return (
    <div style={p.style} className="overflow-y-auto no-scrollbars relative shadow-6 pv2">
      { bars.map((b, idx) => <DayBar bar={b} key={idx} backgroundColor={p.style.backgroundColor as string} />) }
      { sleepEvents.map((e, idx) => <DayEvent event={e} key={idx} />) }
      { foodEvents.map((e, idx) => <DayEvent event={e} key={idx} />) }
    </div>
  )
}

export const Day = observer(_Day)