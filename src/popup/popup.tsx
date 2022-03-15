import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Box, Grid, InputBase, IconButton, Paper } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import "fontsource-roboto"
import "./popup.css"
import WeatherCard from "./WeatherCard"
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage"

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

  if (!options) return null

  //Input field. Import from material-ui to fix the css of input field and also to provide the AddIcon icon
  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent="space-evenly">
        <Grid item>
          <Paper>
            <Box px="15px" py="5py">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box px="5px" py="2px">
              <IconButton onClick={handleTempScaleButton}>
                {options.tempScale === "metric" ? "\u2103" : "\u2109"}
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
