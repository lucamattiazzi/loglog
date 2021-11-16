import React from 'react'
import { observer } from 'mobx-react-lite'
import { state } from '../state'
import { BabyEvent, FoodEvent, SleepEvent } from '../types'
import dayjs from 'dayjs'
import { sortBy } from 'lodash'

function _TableView() {
  const { todayEvents } = state
  const foodEvents = todayEvents.filter(e => e.type === 'food') as FoodEvent[]
  const sortedFoodEvents = sortBy(foodEvents, 'ts')
  const sleepEvents = todayEvents.filter(e => e.type === 'sleep') as SleepEvent[]
  const sortedSleep = sortBy(sleepEvents, 'start')

  function createEvent(type: 'food' | 'sleep') {
    const values = type === 'food'
      ? { ts: dayjs().unix() * 1000, amount: 100 }
      : { start: dayjs().unix() * 1000, end: dayjs().unix() * 1000 + 1000 * 60 * 30 }
    const partialEvent: Partial<BabyEvent> = { type, ...values }
    state.createNewEvent(partialEvent)
  }

  return (
    <div className="w-100 flex-auto flex flex-row bg-light-gray">
      <div className="w-50 br b--black flex flex-column">
        <div className="f3 w-100 tc pt2">🍼</div>
        {
          sortedFoodEvents.map(f => (
            <div
            className="f4 w-100 tc pt2"
            key={f.id}
            onClick={() => state.editEvent(f)}
            >
              {dayjs(f.ts).format('HH:mm')} - {f.amount}ml
            </div>
          ))
        }
        <div className="f4 w-100 tc pt2" onClick={() => createEvent('food')}>➕</div>
      </div>
      <div className="w-50 flex flex-column">
        <div className="f3 w-100 tc pt2">💤</div>
        {
          sortedSleep.map(f => (
            <div
            className="f4 w-100 tc pt2"
            key={f.id}
            onClick={() => state.editEvent(f)}
            >
              {dayjs(f.start).format('HH:mm')} - {dayjs(f.end).format('HH:mm')}
            </div>
          ))
        }
        <div className="f4 w-100 tc pt2" onClick={() => createEvent('sleep')}>➕</div>
      </div>
    </div>
  )
}

export const TableView = observer(_TableView)
