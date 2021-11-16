import Dexie from 'dexie'
import { Area } from 'react-easy-crop/types'


async function writeToDb(dataUrl: string) {
  const db = new Dexie('database')
  db.version(1).stores({
    images: 'id',
  })
  await db.table('images').clear()
  return db.table('images').add({ id: 1, dataUrl })
}

function acceptInput(): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = () => {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        resolve(fileReader.result as string)
      }
      fileReader.onerror = reject
      fileReader.readAsDataURL(input.files[0])
    }
    input.onerror = reject
    input.click()
  })
}

export async function cropAndSaveImage(dataUrl: string, cropPixels: Area): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = async () => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, cropPixels.x, cropPixels.y, cropPixels.width, cropPixels.height, 0, 0, 512, 512)
      const croppedDataUrl = canvas.toDataURL()
      await writeToDb(croppedDataUrl)
      resolve(true)
    }
    image.src = dataUrl
  })
}

export async function loadImage(): Promise<string> {
  const dataUrl = await acceptInput()
  return dataUrl
}

export async function clearDb() {
  const db = new Dexie('database')
  db.version(1).stores({
    images: 'id',
  })
  return db.table('images').clear()
}