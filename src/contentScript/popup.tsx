import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Box, Grid, InputBase, IconButton, Paper } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import "fontsource-roboto"
import "./popup.css"
import WeatherCard from "./WeatherCard"
import { setStoredCities, getStoredCities } from "../utils/storage"

//Display the weatherCard function onto the popup window
const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>(["Seattle", "Tokyo", "Error"])
  const [cityInput, setCityInput] = useState<string>("")

  //when component mounts, updates, and unmounts, the cities in chrome.local.storage will get loaded into the state cities
  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
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

  //Input field. Import from material-ui to fix the css of input field and also to provide the AddIcon icon
  return (
    <Box mx="8px" my="16px">
      <Grid container>
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
      </Grid>

      {cities.map((city, index) => (
        <WeatherCard
          city={city}
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
