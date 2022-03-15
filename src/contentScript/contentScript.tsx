import React from "react"
import ReactDOM from "react-dom"
import { Card } from "@mui/material"
import WeatherCard from "../components/WeatherCard"
import "./contentScript.css"

const App: React.FC<{}> = () => {
  return (
    <Card className="overlayCard">
      <WeatherCard city="Salt Lake City" tempScale="imperial" />
    </Card>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
