import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Typography,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import WeeklyWeather from "./WeeklyWeather";
import monaLogo from "../mona_logo.png";

function Home() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weeklyWeather, setWeeklyWeather] = useState([]);

  //contains cities and their latitude and longitude
  const citiesInfo = {
    "London, England": { latitude: "51.507351", longitude: "-0.127758" },
    "Los Angeles, California": {
      latitude: "34.052235",
      longitude: "-118.243683",
    },
    "Bangkok, Thailand": { latitude: "13.756331", longitude: "100.501762" },
    "Tel Aviv, Israel": { latitude: "32.085300", longitude: "34.781769" },
    "Tokyo, Japan": { latitude: "35.6768601", longitude: "139.7638947" },
  };
  function handleCitySelect(e) {
    const city = e.target.value;
    const api_key = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const lat = citiesInfo[city].latitude;
    const lon = citiesInfo[city].longitude;
    setSelectedCity(city);
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        setWeeklyWeather(res.daily);
      })
      .catch((err) => console.log(err));
  }
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(173,210,230)",
      }}
    >
      <img
        src={monaLogo}
        alt="mona logo"
        style={{ height: "40px", marginRight: "16px" }}
      />

      <Typography
        variant="h1"
        sx={{
          fontSize: "2.5rem",
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "Cursive",
        }}
      >
        Welcome to MonaLabs Weather Forecast!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <FormControl variant="standard">
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCity}
            label={selectedCity}
            onChange={handleCitySelect}
            sx={{ width: 200 }}
          >
            {Object.keys(citiesInfo).map((city) => (
              <MenuItem value={city}>{city}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/*Render the WeeklyWeather component only if we have weather data*/}
      {weeklyWeather.length > 0 && (
        <WeeklyWeather weeklyWeather={weeklyWeather} />
      )}
    </Box>
  );
}
export default Home;
