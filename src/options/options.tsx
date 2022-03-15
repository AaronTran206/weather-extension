import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  Switch,
} from "@mui/material"
import "./options.css"
import "fontsource-roboto"
import {
  getStoredOptions,
  setStoredOptions,
  LocalStorageOptions,
} from "../utils/storage"

type FormState = "ready" | "saving"

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [formState, setFormState] = useState<FormState>("ready")

  //retrieve option settings from local storage for use in App
  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  //Set state of options to content inside text field
  const handleHomeCityChange = (homeCity: string) => {
    console.log(homeCity)
    setOptions({
      ...options,
      homeCity,
    })
  }

  //synchronize state of options in local storage to the one in this App
  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions({
      ...options,
      hasAutoOverlay,
    })
  }

  //when save button is clicked, set the value of text field to option which then gets saved to the chrome local storage. Delay the saving process to let user know that saving worked
  const handleSaveButtonClick = () => {
    setFormState("saving")
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready")
      }, 500)
    })
  }

  if (!options) return null

  //gray out fields while form is saving to improve user experience
  const isFieldsDisabled = formState === "saving"

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
              <Grid item>
                <Typography variant="body1">Home City Name</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter home city name"
                  value={options.homeCity}
                  onChange={(e) => handleHomeCityChange(e.target.value)}
                  disabled={isFieldsDisabled}
                ></TextField>
              </Grid>
              <Grid item>
                <Typography variant="body1">Toggle Auto Overlay</Typography>
                <Switch
                  color="primary"
                  checked={options.hasAutoOverlay}
                  onChange={(e, checked) => handleAutoOverlayChange(checked)}
                  disabled={isFieldsDisabled}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveButtonClick}
                  disabled={isFieldsDisabled}
                >
                  {formState === "ready" ? "Save" : "Saving"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
