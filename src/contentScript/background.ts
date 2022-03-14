import { setStoredCities } from "../utils/storage"

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
})
