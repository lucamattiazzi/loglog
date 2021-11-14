import dayjs from 'dayjs'
import React from 'react'
import { BAR_HEIGHT } from '../lib/constants'
import { state } from '../state'
import { BabyEvent, FoodEvent, SleepEvent } from '../types'

interface DayEventProps {
  event: BabyEvent
}

function getBiberonSize(amount: number) {
}

function FoodEventComponent(p: { e: FoodEvent }) {
  const min = 10
  const max = 36
  const maxAmount = 200
  const fontSize = `${min + Math.min(1, p.e.amount / maxAmount) * (max - min)}px`
  return <div className="w-100 flex justify-center items-center" style={{ fontSize }}>🍼</div>
}

function SleepEventComponent(p: { e: SleepEvent }) {
  const hours = (p.e.end - p.e.start) / (1000 * 60 * 60)
  const height = `${hours * BAR_HEIGHT}px`
  const backgroundColor = 'rgba(30, 4, 112, 0.8)'
  return <div className="w-100" style={{ height, backgroundColor }} />
}

function getEventStyle(event: BabyEvent) {
  const centerTs = event.type === 'food' ? event.ts : event.start + (event.end + event.start) / 2
  const center = dayjs(centerTs)
  const dayStart = center.startOf('day')
  const deltaMinutes = center.diff(dayStart, 'minutes')
  const deltaHours = deltaMinutes / 60
  const pixels = deltaHours * BAR_HEIGHT
  return {
    top: `${pixels}px`,
    transform: 'translateY(-50%)'
  }
}

export function DayEvent(p: DayEventProps) {
  const editEvent = (evt: BabyEvent) => () => {
    state.createNewEvent(evt)
  }

  return (
    <div
      className="w-100 absolute flex justify-center items-center"
      style={getEventStyle(p.event)}
      onClick={editEvent(p.event)}
    >
      {
        p.event.type === 'food'
          ? <FoodEventComponent e={p.event} />
          : <SleepEventComponent e={p.event} />
      }
    </div>
  )
}

