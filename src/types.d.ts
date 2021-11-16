/// <reference types="accurapp-scripts" />

import { VIEWS } from './lib/constants'

export interface FoodEvent {
  id: string
  type: 'food'
  ts: number
  amount: number
}

export interface SleepEvent {
  id: string
  type: 'sleep'
  start: number
  end: number
}

export type BabyEvent = FoodEvent | SleepEvent
export interface Data {
  name: string
  events: BabyEvent[]
}
export interface Bar {
  start: dayjs.Dayjs
  end: dayjs.Dayjs
}

export type View = typeof VIEWS[number]