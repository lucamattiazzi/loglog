import { observer } from 'mobx-react-lite'
import React from 'react'
import dayjs from 'dayjs'

import { DayBar } from './DayBar'
import { FoodEventComponent, SleepEventComponent } from './DayEvent'
import { state } from '../state'
import { Bar } from '../types'
import { getIntervalEventsFilter, isFoodEvent, isSleepEvent } from '../lib/lib'

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
  const filterer = getIntervalEventsFilter(p.start, p.end)
  const events = state.events.filter(filterer) || []

  const foodEvents = events.filter(isFoodEvent)
  const sleepEvents = events.filter(isSleepEvent)

  return (
    <div style={p.style} className="overflow-y-auto no-scrollbars relative shadow-6">
      { bars.map((b, idx) => <DayBar bar={b} key={idx} backgroundColor={p.style.backgroundColor as string} />) }
      { sleepEvents.map((e, idx) => <SleepEventComponent start={p.start} end={p.end} event={e} key={idx} />) }
      { foodEvents.map((e, idx) => <FoodEventComponent start={p.start} end={p.end} event={e} key={idx} />) }
    </div>
  )
}

export const Day = observer(_Day)