import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { state } from '../state'
import { SleepEvent } from '../types'

function _SleepForm() {
  const currentEvent = state.currentEvent as SleepEvent
  const start = currentEvent.start || currentEvent['ts'] || dayjs().unix() * 1000
  const end = currentEvent.end || start + 1000 + 1000 * 60 * 30

  function onStartChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [hours, minutes] = e.target.value.split(':')
    const start = dayjs().set('hour', Number(hours)).set('minutes', Number(minutes)).unix() * 1000
    state.updateCurrentEvent({ start })
  }

  function onEndChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [hours, minutes] = e.target.value.split(':')
    const end = dayjs().set('hour', Number(hours)).set('minutes', Number(minutes)).unix() * 1000
    state.updateCurrentEvent({ end })
  }

  const startValue = dayjs(start).format('YYYY-MM-DDTHH:mm')
  const endValue = dayjs(end).format('YYYY-MM-DDTHH:mm')

  useEffect(() => {
    state.updateCurrentEvent({ start, end, type: 'sleep' })
  }, [])

  return (

    <div className="flex flex-column w-100">
      <div className="flex flex-row justify-around mb3 items-center">
        <div className="w-50 f5 b ph2">Orario nanna</div>
        <input className="w-50 mh2" type="datetime-local" onChange={onStartChange} step={60 * 15} value={startValue}  />
      </div>
      <div className="flex flex-row justify-around items-center">
        <div className="w-50 f5 b ph2">Orario sveglia</div>
        <input className="w-50 mh2" type="datetime-local" onChange={onEndChange} step={60 * 15} value={endValue} />
      </div>
    </div>
  )
}

export const SleepForm = observer(_SleepForm)