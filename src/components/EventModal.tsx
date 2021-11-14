import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { state } from '../state'
import { BabyEvent, FoodEvent, NewEvent, SleepEvent } from '../types'

interface FormProps<T> {
  additionalData: T
  setAdditionalData: (data: NewEvent, force?: boolean) => void
}

function FoodForm(p: FormProps<Partial<FoodEvent>>) {
  const { ts = dayjs().unix() * 1000, amount = 100 } = p.additionalData

  function onTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [hours, minutes] = e.target.value.split(':')
    const ts = dayjs().set('hour', Number(hours)).set('minutes', Number(minutes)).unix() * 1000
    p.setAdditionalData({ ts })
  }

  function onAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    p.setAdditionalData({ amount: Number(e.target.value) })
  }

  const timeValue = `${String(dayjs(ts).hour()).padStart(2, '0')}:${String(dayjs(ts).minute()).padStart(2, '0')}`

  useEffect(() => {
    p.setAdditionalData({ ts, amount }, true)
  }, [])

  return (
    <>
      <input type="time" onChange={onTimeChange} step={60 * 15} value={timeValue} />
      <input type="number" onChange={onAmountChange} value={amount}/>
    </>
  )
}

function SleepForm(p: FormProps<Partial<SleepEvent>>) {
  const { start = dayjs().unix() * 1000, end = dayjs().unix() * 1000 + 1000 * 60 * 30 } = p.additionalData

  function onStartChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [hours, minutes] = e.target.value.split(':')
    const start = dayjs().set('hour', Number(hours)).set('minutes', Number(minutes)).unix() * 1000
    p.setAdditionalData({ start })
  }

  function onEndChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [hours, minutes] = e.target.value.split(':')
    const end = dayjs().set('hour', Number(hours)).set('minutes', Number(minutes)).unix() * 1000
    p.setAdditionalData({ end })
  }

  const startValue = `${String(dayjs(start).hour()).padStart(2, '0')}:${String(dayjs(start).minute()).padStart(2, '0')}`
  const endValue = `${String(dayjs(end).hour()).padStart(2, '0')}:${String(dayjs(end).minute()).padStart(2, '0')}`

  useEffect(() => {
    p.setAdditionalData({ start, end }, true)
  }, [])

  return (
    <>
      <input type="time" onChange={onStartChange} step={60 * 15} value={startValue} />
      <input type="time" onChange={onEndChange} step={60 * 15} value={endValue} />
    </>
  )
}

export function EventModal() {
  const [type, setType] = React.useState<'food' | 'sleep'>('food')
  const [additionalData, _setAdditionalData] = React.useState<NewEvent>({})
  console.log('additionalData', additionalData)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value as 'food' | 'sleep')
  }

  function onClickSave(e: React.MouseEvent<HTMLDivElement>) {
    state.saveEvent({ type, ...additionalData } as BabyEvent)
  }

  function setAdditionalData(data: NewEvent, force: boolean = false) {
    force
      ? _setAdditionalData(data)
      : _setAdditionalData({ ...additionalData, ...data })
  }

  return (
    <div className="absolute w-100 h-100 bg-white-80 flex justify-center items-center">
      <form className="flex flex-column" onSubmit={onSubmit}>
        <div className="f3 mb2">Tipo di evento:</div>
        <select className="mb2" value={type} onChange={onSelectChange}>
          <option value="food">Cibo</option>
          <option value="sleep">Sonno</option>
        </select>
        <div className="mb2">
          {
            type === 'food'
              ? <FoodForm setAdditionalData={setAdditionalData} additionalData={additionalData as Partial<FoodEvent>} />
              : <SleepForm setAdditionalData={setAdditionalData} additionalData={additionalData as Partial<SleepEvent>} />
          }
        </div>
        <div className="pointer pv2 ph3 ba b--black tc bg-white" onClick={onClickSave}>SAVE</div>
      </form>
    </div>
  )
}
