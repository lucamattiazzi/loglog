import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { sortBy } from 'lodash'
import { saveAs } from 'file-saver'
import { Area } from 'react-easy-crop/types'
import { CropUplodedImage } from './CropUploadedImage'
import { state } from '../state'
import { clearDb, cropAndSaveImage, loadImage } from '../lib/pwa'

function _InfoView() {
  const [imageSrc, setImageSrc] = React.useState<string>()
  const [uploadedImageSrc, setUploadedImageSrc] = React.useState<string>()
  const [cropPixels, setCropPixels] = React.useState<Area>()

  function promptForInstallation() {
    state.promptForInstallation()
  }

  async function onChangeIconClick() {
    const dataUrl = await loadImage()
    setUploadedImageSrc(dataUrl)
  }
  
  async function onResetIconClick() {
    await clearDb()
    window.location.reload()
  }
  
  function love() {
    window.alert('sí è la più bella')
  }
  
  function onCropComplete(_: Area, cropPixels: Area) {
    setCropPixels(cropPixels)
  }
  
  async function onSaveIconClick() {
    await cropAndSaveImage(uploadedImageSrc, cropPixels)
    window.location.reload()
  }

  function handleExportClick() {
    const json = JSON.stringify(state.data, null, 2)
    const blob = new Blob([json], {type: "text/json;charset=utf-8"});
    saveAs(blob, `data_export-${new Date().toISOString()}.json`)
  }

  useEffect(() => {
    fetch('/manifest.webmanifest').then(r => r.json()).then(manifest => {
      const { icons } = manifest
      const biggest = sortBy(icons, i => -Number(i.sizes.split('x')[0]))[0]
      setImageSrc(biggest.src)
    }).catch(console.error)
  }, [])

  return (
    <div className="w-100 flex-auto flex flex-column bg-light-gray justify-start">
      <div className="flex flex-column items-center justify-center ph3">
        <div className="f3 b pt4 pb3">Che è?</div>
        <p>
          Webapp per tracciare e confrontare orari di pappa e nanna dei neonati (o boh quello che vi pare).<br /><br />
          Scritta in gigaritardo per la piccola <span onClick={love}>❤️ Elisa ❤️</span>.<br /><br />
          Ma anche altri bimbi hanno diritto a usarla.
        </p>
        <a href="https://github.com/lucamattiazzi/loglog" target="_blank" rel="noopener noreferrer">
          <img src="/octocat.png" style={{ height: '50px' }} />
        </a>
      </div>
      <hr className="w-80 mv4" />
      {
        state.installPromptEvent && 
        <div className="flex flex-column items-center pv3">
          <div className="f3 b pb3" onClick={promptForInstallation}>Installa applicazione</div>
          <div className="pa2 bg-orange mb3 br3 relative" style={{ width: '128px', height: '128px' }}>
            {imageSrc && <img src={imageSrc} className="br-pill" onClick={promptForInstallation} />}
          </div>
          <div className="f4 pv2 ph3 tc bg-light-blue br4 mb3" onClick={onChangeIconClick}>Cambia Icona</div>
          <div className="f4 pv2 ph3 tc bg-light-blue br4" onClick={onResetIconClick}>Torna a default</div>
        </div>
      }
      {  
        state.installPromptEvent && uploadedImageSrc && 
          <div className="absolute w-100 h-100 bg-white-80 flex flex-column items-center justify-center">
            <div className="relative overflow-hidden mb4" style={{ width: '300px', height: '300px' }}>
              <CropUplodedImage dataUrl={uploadedImageSrc} onCropComplete={onCropComplete}/>
            </div>
            <div className="f2 pv3 ph4 tc bg-light-blue br4 mb3" onClick={onSaveIconClick}>Salva Icona</div>
          </div>
      }
      <div className="flex flex-column">
        <div onClick={handleExportClick}>Esporta dati</div>
      </div>
    </div>
  )
}

export const InfoView = observer(_InfoView)
