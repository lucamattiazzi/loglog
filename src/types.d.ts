/// <reference types="accurapp-scripts" />

export interface FoodEvent {
  type: 'food'
  ts: number
  amount: number
}

export interface SleepEvent {
  type: 'sleep'
  start: number
  end: number
}

export type BabyEvent = FoodEvent | SleepEvent
export type NewEvent = Partial<BabyEvent>
export interface Data {
  name: string
  events: BabyEvent[]
}
export interface Bar {
  start: dayjs.Dayjs
  end: dayjs.Dayjs
}