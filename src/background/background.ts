import { setStoredCities, setStoredOptions } from "../utils/storage"

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
  setStoredOptions({
    homeCity: "Seattle",
    tempScale: "imperial",
  })
})
