import { makeAutoObservable } from "mobx"
import { fetchData, saveEvent } from "../lib/lib"
import { BabyEvent, Data, NewEvent } from "../types"

class State {
  selectedEvent?: NewEvent
  data?: Data

  constructor() {
    makeAutoObservable(this)
    this.fetchData()
  }

  // public

  public createNewEvent(event: NewEvent) {
    this.setSelectedEvent(event)
  }

  public saveEvent(event: BabyEvent) {
    console.log('event', event)
    saveEvent(event)
  }

  // private

  private fetchData() {
    fetchData().then(d => this.setData(d))
  }

  // actions

  private setData(data: Data) {
    this.data = data
  }

  private setSelectedEvent(event: NewEvent) {
    this.selectedEvent = event
  }
}


export const state = new State()