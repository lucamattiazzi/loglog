import dayjs from "dayjs"
import { merge } from "lodash"
import { makeAutoObservable, reaction } from "mobx"
import { v4 } from 'uuid'
import { VIEWS } from "../lib/constants"
import { fetchData, saveData } from "../lib/lib"
import { BabyEvent, Data, View } from "../types"

let installPromptEvent: any = null
let serviceWorker: ServiceWorker = null

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`).then(reg => {
    serviceWorker = reg.active
  })
}

window.addEventListener('beforeinstallprompt', (e: any) => {
  e.preventDefault()
  installPromptEvent = e
})

function getFirstView(): View {
  const hash = window.location.hash.replace('#', '') as View
  const viewIndex = VIEWS.includes(hash) ? hash : VIEWS[0]
  return viewIndex
}

class State {
  newEvent: BabyEvent = null
  editableEventId: BabyEvent['id'] = null
  data: Data = null
  tableView: boolean = false
  showPwaPrompt: boolean = false
  currentView: View = getFirstView()

  constructor() {
    makeAutoObservable(this)
    this.fetchData()
  }

  get events() {
    return [
      ...(this.data?.events || []),
      this.newEvent
    ].filter(a => a)
  }

  get todayEvents() {
    const today = dayjs()
    const start = today.startOf('day').unix() * 1000
    const end = today.endOf('day').unix() * 1000
    const events = this.events.filter(e => 
      e.type === 'food' ? e.ts > start && e.ts < end : e.start > start && e.end < end
    ) || []
    return events
  }

  get currentEvent() {
    return this.newEvent || this.events.find(e => e.id === this.editableEventId)
  }

  get showModal() {
    return Boolean(this.currentEvent)
  }

  get isNewEvent() {
    return Boolean(this.newEvent)
  }

  get installPromptEvent() {
    return installPromptEvent
  }

  get serviceWorker() {
    return serviceWorker
  }

  // public

  public createNewEvent(event: Partial<BabyEvent>) {
    const id = v4()
    const newEvent = { ...event, id } as BabyEvent
    this.setNewEvent(newEvent)
  }

  public editEvent(event: BabyEvent) {
    this.setCurrentEventId(event.id)
  }

  public saveEvent() {
    if (this.isNewEvent) this.addEvent(this.newEvent)
    saveData(this.data)
    this.isNewEvent ? this.setNewEvent(null) : this.setCurrentEventId(null)
  }

  public deleteEvent() {
    if (this.isNewEvent) return this.setNewEvent(null)
    this.data.events = this.data.events.filter(e => e.id !== this.currentEvent.id)
    saveData(this.data)
  }

  public updateCurrentEvent = (eventUpdate: Partial<BabyEvent>) => {
    merge(this.currentEvent, eventUpdate)
    saveData(this.data)
  }
  
  public isEventNew = async (event: BabyEvent): Promise<boolean> => {
    const savedData = await fetchData()
    return savedData.events.some(e => e.id === event.id)
  }

  public promptForInstallation = () => {
    try {
      this.installPromptEvent.prompt()
    } catch (err) {
      window.alert('Impossibile installare app :(')
    }
  }

  public goToView(view: View) {
    this.setView(view)
  }

  // private

  private async fetchData() {
    const savedData = await fetchData()
    this.setData(savedData)
  }

  // actions

  private addEvent(event: BabyEvent) {
    if (this.data.events.some(e => e.id === event.id)) return
    this.data.events.push(event)
  }
  
  private setData(data: Data) {
    this.data = data
  }

  private setNewEvent(event: BabyEvent) {
    this.newEvent = event
  }

  private setCurrentEventId(eventId: BabyEvent['id']) {
    this.editableEventId = eventId
  }

  private setView(view: View) {
    this.currentView = view
  }
}

const state = new State()

reaction(() => state.currentView, (currentView) => {
  window.location.hash = currentView
})

export { state }