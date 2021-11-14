import { BabyEvent, Data } from '../types'
import dayjs from 'dayjs'

function getExistingData() {
  const existingData = localStorage.getItem('data')
  if (!existingData) return { name: 'Elisa', events: [] } as Data
  const parsed = JSON.parse(existingData) as Data
  return parsed
}

export async function fetchData(): Promise<Data> {
  return getExistingData()
}

export async function saveEvent(event: BabyEvent): Promise<boolean> {
  const existingData = getExistingData()
  existingData.events.push(event)
  localStorage.setItem('data', JSON.stringify(existingData))
  return true
}

export function getDayRange(delta: number) {
  const today = dayjs().add(delta, 'day')
  const start = today.startOf('day')
  const end = today.endOf('day')
  return [start.unix() * 1000, end.unix() * 1000]
}