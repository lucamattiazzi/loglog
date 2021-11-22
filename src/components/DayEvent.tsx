import dayjs from 'dayjs'
import React from 'react'
import { BAR_HEIGHT } from '../lib/constants'
import { state } from '../state'
import { BabyEvent, FoodEvent, SleepEvent } from '../types'
interface DayEventProps {
  event: BabyEvent
  children: React.ReactNode
  centerTs: number
}

interface FoodEventProps {
  event: FoodEvent
  start: number
  end: number
}

interface SleepEventProps {
  event: SleepEvent
  start: number
  end: number
}

function getEventStyle(centerTs: number) {
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

function DayEventWrapper(p: DayEventProps) {
  const editEvent = (evt: BabyEvent) => () => state.editEvent(evt)

  return (
    <div
      className="w-100 absolute flex justify-center items-center"
      style={getEventStyle(p.centerTs)}
      onClick={editEvent(p.event)}
    >
      { p.children }
    </div>
  )
}

export function FoodEventComponent(p: FoodEventProps ) {
  const min = 10
  const max = 36
  const maxAmount = 200
  const fontSize = `${min + Math.min(1, p.event.amount / maxAmount) * (max - min)}px`
  return (
    <DayEventWrapper event={p.event} centerTs={p.event.ts}>
      <div className="w-100 flex justify-center items-center" style={{ fontSize }}>🍼</div>
    </DayEventWrapper>
  )
}

export function SleepEventComponent(p: SleepEventProps) {
  const eventStart = Math.max(p.event.start, p.start)
  const eventEnd = Math.min(p.event.end, p.end)
  const hours = (eventEnd - eventStart) / (1000 * 60 * 60)
  const height = `${hours * BAR_HEIGHT}px`
  const backgroundColor = 'rgba(30, 4, 112, 0.4)'
  const centerTs = eventStart + (eventEnd - eventStart) / 2
  return (
    <DayEventWrapper event={p.event} centerTs={centerTs}>
      <div className="w-100" style={{ height, backgroundColor }} />
    </DayEventWrapper>
  )
}