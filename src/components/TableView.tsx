import React from 'react'
import { observer } from 'mobx-react-lite'
import { sumBy }  from 'lodash-es'
import { state } from '../state'
import { BabyEvent, FoodEvent, SleepEvent } from '../types'
import dayjs from 'dayjs'
import { sortBy } from 'lodash'

function getTotalSleep(events: SleepEvent[]): string {
  const totalSleepRawMinutes = sumBy(events, e => e.end - e.start) / (1000 * 60)
  const totalSleepHours = Math.floor(totalSleepRawMinutes / 60)
  const totalSleepMinutes = Math.floor(totalSleepRawMinutes - totalSleepHours * 60)

  return totalSleepHours ? `${totalSleepHours}h ${totalSleepMinutes}m` : `${totalSleepMinutes}m`
}

function _TableView() {
  const [currentDay, setCurrentDay] = React.useState<string>(dayjs().format('YYYY-MM-DD'))

  const dayEvents = state.getDayEvents(currentDay)
  const foodEvents = dayEvents.filter(e => e.type === 'food') as FoodEvent[]
  const sortedFoodEvents = sortBy(foodEvents, 'ts')
  const sleepEvents = dayEvents.filter(e => e.type === 'sleep') as SleepEvent[]
  const sortedSleep = sortBy(sleepEvents, 'start')
  const totalFood = `${sumBy(foodEvents, 'amount') || 0} ml`
  const totalSleep = getTotalSleep(sleepEvents)

  function createEvent(type: 'food' | 'sleep') {
    const hour = dayjs().format('HH:mm')
    const dateTime = [currentDay, hour].join('T')
    const dayTs = dayjs(dateTime).unix() * 1000
    const values = type === 'food'
      ? { ts: dayTs, amount: 100 }
      : { start: dayTs, end: dayTs + 1000 * 60 * 30 }
    const partialEvent: Partial<BabyEvent> = { type, ...values }
    state.createNewEvent(partialEvent)
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentDay(e.target.value)
  }

  return (
    <div className="w-100 h-100 flex flex-column bg-light-gray">
      <div className="w-100 tc pv2">
        <label className="pr3 f4 b" htmlFor="date-input">Giorno:</label>
        <input id="date-input" type="date" onChange={handleDateChange} value={currentDay}/>
      </div>
      <div className="w-100 flex-auto flex flex-row">
        <div className="w-50 br b--black flex flex-column justify-between">
          <div className="w-100 flex flex-column">
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
          <div className="w-100 tc pb5 f3">
            Totale: {totalFood}
          </div>
        </div>
        <div className="w-50 flex flex-column justify-between">
          <div className="w-100 flex flex-column">
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
          <div className="w-100 tc pb5 f3">
            Totale: {totalSleep}
          </div>
        </div>
      </div>
    </div>
  )
}

export const TableView = observer(_TableView)
