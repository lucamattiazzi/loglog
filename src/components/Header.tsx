import React from 'react'
import { observer } from 'mobx-react-lite'
import { state } from '../state'

function _Header() {
  return (
    <div className="flex flex-row justify-around items-center w-100 pv2 ph2 f2 bg-orange">
      <div onClick={() => state.goToView('calendar')}>📅</div>
      <div onClick={() => state.goToView('table')}>📋</div>
      <div>🔑</div>
      <div>🔒</div>
      <div onClick={() => state.goToView('info')}>ℹ️</div>
    </div>
  )
}

export const Header = observer(_Header)
