import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { state } from '../state'

function _LoginView() {
  return (
    <div className="w-100 flex-auto flex flex-column bg-light-gray justify-start">
      <div className="flex flex-column items-center justify-center ph3">
        <p>
          Potete sincronizzare lo stato della vostra applicazione usando Google Drive.
          Salvando su Google Drive sarà possibile condividere lo stato tra diverse persone.
        </p>
      </div>
      <hr className="w-80 mv4" />
    </div>
  )
}

export const LoginView = observer(_LoginView)
