import React from 'react'
import { observer } from 'mobx-react-lite'
import { state } from '../state'

function _Header() {
  return (
    <div className="flex flex-row justify-around items-center w-100 pv2 ph2 f2 bg-orange">
      <div onClick={() => state.goToView('calendar')}>đ</div>
      <div onClick={() => state.goToView('table')}>đ</div>
      <div onClick={() => state.goToView('login')}>đ</div>
      <div>đ</div>
      <div onClick={() => state.goToView('info')}>âšī¸</div>
    </div>
  )
}

export const Header = observer(_Header)
