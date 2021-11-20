import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { state } from '../state'
import { FoodEvent } from '../types'

function _FoodForm() {
  const currentEvent = state.currentEvent as FoodEvent
  const ts = currentEvent.ts || currentEvent['start'] || dayjs().unix() * 1000
  const amount = currentEvent.amount || 100

  function onTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const ts = dayjs(e.target.value).unix() * 1000
    state.updateCurrentEvent({ ts })
  }

  function onAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    state.updateCurrentEvent({ amount: Number(e.target.value) })
  }

  const timeValue = dayjs(ts).format('YYYY-MM-DDTHH:mm')

  useEffect(() => {
    state.updateCurrentEvent({ type: 'food', ts, amount })
  }, [])

  return (
    <div className="flex flex-column w-100">
      <div className="flex flex-row justify-around mb3 items-center">
        <div className="w-50 f5 b ph2">Orario pappa</div>
        <input className="w-50 mh2" type="datetime-local" onChange={onTimeChange} step={60 * 15} value={timeValue} />
      </div>
      <div className="flex flex-row justify-around items-center">
        <div className="w-50 f5 b ph2">Quantità pappa (ml)</div>
        <input className="w-50 mh2" type="number" onChange={onAmountChange} value={amount}/>
      </div>
    </div>
  )
}

export const FoodForm = observer(_FoodForm)