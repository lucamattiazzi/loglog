import React, { Component } from 'react'
import { observer } from 'mobx-react-lite'
import { Header } from './Header'
import { CalendarView } from './CalendarView'
import { EventModal } from './EventModal'
import { TableView } from './TableView'
import { InfoView } from './InfoView'
import { LoginView } from './LoginView'
import { state } from '../state'
import { View } from '../types'

type MobxComponent = (() => JSX.Element) & {
    displayName: string;
}

const VIEW_COMPONENTS: Record<View, MobxComponent> = {
  calendar: CalendarView,
  table: TableView,
  info: InfoView,
  login: LoginView
}

function _App() {
  const MainView = VIEW_COMPONENTS[state.currentView]
  return (
    <div className="w-100 h-100 flex flex-column relative">
      <Header />
      <MainView />
      { state.showModal && <EventModal /> }
    </div>
  )
}

export const App = observer(_App)
