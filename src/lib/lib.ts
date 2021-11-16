import { Data } from '../types'
import dayjs from 'dayjs'

export async function fetchData(): Promise<Data> {
  const existingData = localStorage.getItem('data')
  if (!existingData) return { name: 'Elisa', events: [] } as Data
  const parsed = JSON.parse(existingData) as Data
  return parsed
}

export async function saveData(data: Data): Promise<boolean> {
  localStorage.setItem('data', JSON.stringify(data))
  return true
}

export function getDayRange(delta: number) {
  const today = dayjs().add(delta, 'day')
  const start = today.startOf('day')
  const end = today.endOf('day')
  return [start.unix() * 1000, end.unix() * 1000]
}