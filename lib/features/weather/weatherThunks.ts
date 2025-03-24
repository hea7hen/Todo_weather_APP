import { createAsyncThunk } from "@reduxjs/toolkit"

// Replace the mock API key with the provided real API key
const API_KEY = "59dbb1b9b47c43d9848171948252403"

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city: string, { rejectWithValue }) => {
  try {
    // Use the real API with the provided key
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)

    if (!response.ok) {
      throw new Error("Weather data could not be fetched")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch weather data")
  }
})

