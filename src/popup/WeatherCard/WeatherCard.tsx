import React, { useEffect, useState } from "react"
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material"
import { fetchOpenWeatherData, OpenWeatherData } from "../../utils/api"

//Weathercard Container react function
const WeatherCardContainer: React.FC<{
  children: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="error" onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

//setup type for weather cards
type WeatherCardState = "loading" | "error" | "ready"

//logic for weathercard container
const WeatherCard: React.FC<{
  city: string
  onDelete?: () => void
}> = ({ city, onDelete }) => {
  //useState for weather data
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  //useState for state of the cards
  const [cardState, setCardState] = useState<WeatherCardState>("loading")

  //Fetch data for city information and plug into OpenWeatherData interface
  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data)
        setCardState("ready")
      })
      .catch((err) => setCardState("error"))
  }, [city])

  //if cardState is loading or error, then display a message on the card stating the state of card
  if (cardState == "loading" || cardState == "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {cardState == "loading"
            ? "Loading..."
            : "Error: could not retrieve weather data for this city"}
        </Typography>
      </WeatherCardContainer>
    )
  }

  //return the weathercard to display in the popup window. This weathercard component contains the weather conditions at the specified city
  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant="h5">{weatherData.name}</Typography>
      <Typography variant="body1">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard