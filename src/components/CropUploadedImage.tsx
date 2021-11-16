import React from 'react'
import Cropper from 'react-easy-crop'
import { Area } from 'react-easy-crop/types'

interface Props {
  dataUrl: string
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void
}

export function CropUplodedImage(props: Props) {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)

  return (
    <Cropper
      image={props.dataUrl}
      crop={crop}
      zoom={zoom}
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={props.onCropComplete}
      onZoomChange={setZoom}
    />
  )
}
