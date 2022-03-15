import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Card } from "@mui/material"
import WeatherCard from "../components/WeatherCard"
import { getStoredOptions, LocalStorageOptions } from "../utils/storage"
import { Messages } from "../utils/messages"
import "./contentScript.css"

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [isActive, setIsActive] = useState<boolean>(false)

  //retrieve the state of options from local storage then set it to the state of this App
  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options)
      setIsActive(options.hasAutoOverlay)
    })
  }, [])

  //whenever isActive state is changed, switch the active state to the opposite boolean
  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive)
      }
    })
  }, [isActive])

  if (!options) return null

  return (
    <>
      {isActive && (
        <Card className="overlayCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => setIsActive(false)}
          />
        </Card>
      )}
    </>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
