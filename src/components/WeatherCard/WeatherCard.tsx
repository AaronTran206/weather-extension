import React, { useEffect, useState } from "react"
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid
} from "@mui/material"
import {
  getWeatherIconSrc,
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from "../../utils/api"
import "./WeatherCard.css"

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
              <Typography className="weatherCard-body">Delete</Typography>
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
  tempScale: OpenWeatherTempScale
  onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
  //useState for weather data
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  //useState for state of the cards
  const [cardState, setCardState] = useState<WeatherCardState>("loading")

  //Fetch data for city information and plug into OpenWeatherData interface
  useEffect(() => {
    //put city and tempScale as parameters for fetch request
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data)
        setCardState("ready")
      })
      .catch((err) => setCardState("error"))
    //run useEffect whenever the city or tempScale parameter is changed
  }, [city, tempScale])

  //if cardState is loading or error, then display a message on the card stating the state of card
  if (cardState == "loading" || cardState == "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">
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
      <Grid container justifyContent={'space-around'}>
        <Grid item>
          <Typography className="weatherCard-title">{weatherData.name}</Typography>
          <Typography className="weatherCard-temp">
            {Math.round(weatherData.main.temp)}&nbsp;
            {tempScale === "metric" ? "\u2103" : "\u2109"}
          </Typography>
          <Typography className="weatherCard-body">
            Feels like:&nbsp;
            {Math.round(weatherData.main.feels_like)}&nbsp;
            {tempScale === "metric" ? "\u2103" : "\u2109"}
          </Typography>
        </Grid>
        <Grid item>
          {
          weatherData.weather.length > 0 && <><img src={getWeatherIconSrc(weatherData.weather[0].icon)}/>
          <Typography className="weatherCard-body">{weatherData.weather[0].main}</Typography>
          </>
          }
        </Grid>
        
      </Grid>
      
    </WeatherCardContainer>
  )
}

//export the component to be loaded in the popup. The arguments are passed in as properties to the component in the popup window.
export default WeatherCard
