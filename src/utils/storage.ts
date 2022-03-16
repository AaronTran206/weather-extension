import { OpenWeatherTempScale } from "./api"

//interface for the basic local storage
export interface LocalStorage {
  cities?: string[]
  options?: LocalStorageOptions
}

//interface of the local storage's option properties
export interface LocalStorageOptions {
  hasAutoOverlay: boolean
  homeCity: string
  tempScale: OpenWeatherTempScale
}

//capture key of properties within local storage
export type LocalStorageKeys = keyof LocalStorage

//set passed in cities into the local storage state
export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = {
    cities,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

//retrieve stored cities from local storage
export function getStoredCities(): Promise<string[]> {
  //get the array of cities within local storage to pass into chrome.storage.local.get()
  const keys: LocalStorageKeys[] = ["cities"]
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities ?? [])
    })
  })
}

//set passed in options to the local storage
export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

//retrieve stored options from local storage
export function getStoredOptions(): Promise<LocalStorageOptions> {
  //create array of options to pass into chrome.storage.local.get()
  const keys: LocalStorageKeys[] = ["options"]
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options)
    })
  })
}
