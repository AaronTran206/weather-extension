import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Box, Grid, InputBase, IconButton, Paper } from "@mui/material"
import {
  Add as AddIcon,
  PictureInPicture as PictureInPictureIcon,
} from "@mui/icons-material"
import "fontsource-roboto"
import "./popup.css"
import WeatherCard from "../components/WeatherCard"
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage"
import { Messages } from "../utils/messages"
import "./popup.css"

//Display the weatherCard function onto the popup window
const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>(["Seattle", "Tokyo", "Error"])
  const [cityInput, setCityInput] = useState<string>("")
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  //when component mounts, updates, and unmounts, the cities in chrome.local.storage will get loaded into the state cities
  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  //AddIcon functionality
  const handleCityButtonClick = () => {
    if (cityInput === "") return

    const updatedCities = [...cities, cityInput]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
      setCityInput("")
    })
  }

  //Delete function
  const handleCityDelete = (index: number) => {
    cities.splice(index, 1)
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
    })
  }

  //when temp scale button is clicked, change the icon to other tempscale option
  const handleTempScaleButton = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    }
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions)
    })
  }

  //grab current active tab. If there is more than 0 tabs open, send message to contentScript to toggle the overlay along with the tab ID
  const handleOverlayButton = () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY)
        }
      }
    )
  }

  if (!options) return null

  //Input field. Import from material-ui to fix the css of input field and also to provide the AddIcon icon
  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent={"space-evenly"}>
        <Grid item>
          <Paper>
            <Box textAlign="center" px="15px" py="5py">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon style={{ fontSize: 35 }} />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box textAlign="center" py="4px">
              <IconButton size="medium" onClick={handleTempScaleButton}>
                {options.tempScale === "metric" ? "\u2103" : "\u2109"}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box textAlign="center" py="4px">
              <IconButton onClick={handleOverlayButton}>
                <PictureInPictureIcon style={{ fontSize: 28 }} />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity != "" && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options.tempScale}
          key={index}
          onDelete={() => handleCityDelete(index)}
        />
      ))}
      <Box height="16px" />
    </Box>
  )
}

//append the App variable to the document
const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
