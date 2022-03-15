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
  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  const handleHomeCityChange = (homeCity: string) => {
    console.log(homeCity)
    setOptions({
      ...options,
      homeCity,
    })
  }

  const handleSaveButtonClick = () => {
    setFormState("saving")
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready")
      }, 500)
    })
  }

  if (!options) return null

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
