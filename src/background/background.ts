import {
  setStoredCities,
  setStoredOptions,
  getStoredCities,
  getStoredOptions,
} from "../utils/storage"
import { fetchOpenWeatherData } from "../utils/api"

//set default values for options
chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
  setStoredOptions({
    hasAutoOverlay: false,
    homeCity: "",
    tempScale: "imperial",
  })

  //create contextMenu template
  chrome.contextMenus.create({
    contexts: ["selection"],
    title: "Add city to weather extension",
    id: "weatherExtension",
  })

  //set interval for alarm function
  chrome.alarms.create({
    periodInMinutes: 60,
  })
})

//add selection text to cities array
chrome.contextMenus.onClicked.addListener((e) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, e.selectionText])
  })
})

//retrieve homeCity data then put it into the fetchOpenWeatherData API request to set badge text equal to homecity temperature
chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (options.homeCity === "") return

    fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
      const temp = Math.round(data.main.temp)
      const symbol = options.tempScale === "metric" ? "\u2103" : "\u2109"
      chrome.action.setBadgeText({
        text: `${temp}${symbol}`,
      })
    })
  })
})
