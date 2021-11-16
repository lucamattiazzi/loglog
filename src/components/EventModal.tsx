import { observer } from 'mobx-react-lite'
import React from 'react'
import { state } from '../state'
import { FoodForm } from './FoodForm'
import { SleepForm } from './SleepForm'

function _EventModal() {
  const { currentEvent: { type }, isNewEvent } = state

  function setType(type: 'food' | 'sleep') {
    state.updateCurrentEvent({ type })
  }

  function onClickSave() {
    state.saveEvent()
  }

  function onClickDelete() {
    state.deleteEvent()
  }

  const FormComponent = type === 'food' ? FoodForm : SleepForm
  const title = isNewEvent ? 'Crea nuovo evento' : 'Modifica evento'

  return (
    <div className="absolute w-100 h-100 bg-white-60 flex flex-row justify-center items-center">
      <div className="flex flex-column bg-white-60 w-100 pv4 ph2">
        <div className="f3 mb2 tc pb3 b">{title}</div>
        <div className="w-100 flex flex-row justify-around items-center">
          <div
            className="f1 pv3 ph4 tc bg-light-blue b br4"
            onClick={() => setType('food')}
            style={{ opacity: type === 'sleep' ? 0.3 : 1 }}
          >
            🍼
          </div>
          <div
            className="f1 pv3 ph4 tc bg-light-blue b br4"
            onClick={() => setType('sleep')}
            style={{ opacity: type === 'food' ? 0.3 : 1 }}
          >
            💤
          </div>
        </div>
        <div className="mv4 w-100 tc">
          <FormComponent />
        </div>
        <div className="w-100 flex flex-row justify-around items-center">
          <div className="f3 pv3 ph4 tc bg-green b br4" onClick={onClickSave}>💾</div>
          <div className="f3 pv3 ph4 tc bg-orange b br4" onClick={onClickDelete}>🗑️</div>
        </div>
      </div>
    </div>
  )
}

export const EventModal = observer(_EventModal)