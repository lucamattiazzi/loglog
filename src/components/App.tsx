import React from 'react'
import { observer } from 'mobx-react-lite'
import { Header } from './Header'
import { Calendar } from './Calendar'
import { EventModal } from './EventModal'
import { state } from '../state'

function _App() {
  return (
    <div className="w-100 h-100 flex flex-column relative">
      <Header />
      <Calendar />
      {state.selectedEvent && <EventModal /> }
    </div>
  )
}

export const App = observer(_App)
