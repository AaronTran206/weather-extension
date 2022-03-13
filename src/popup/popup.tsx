import React, { useState } from "react"
import ReactDOM from "react-dom"
import { Box, Grid, InputBase, IconButton, Paper } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import "fontsource-roboto"
import "./popup.css"
import WeatherCard from "./WeatherCard"

//Display the weatherCard function onto the popup window
const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>(["Seattle", "Tokyo", "Error"])
  const [cityInput, setCityInput] = useState<string>("")

  //AddIcon functionality
  const handleCityButtonClick = () => {
    if (cityInput === "") return

    setCities([...cities, cityInput])
    setCityInput("")
  }

  //Delete function
  const handleCityDelete = (index: number) => {
    cities.splice(index, 1)
    setCities([...cities])
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
