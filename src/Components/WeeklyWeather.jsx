import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import CustomTooltip from "./CustomTooltip";
import DailyWeatherTick from "./DailyWeatherTick";
import { Typography, Box } from "@mui/material";
function WeeklyWeather({ weeklyWeather }) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  /* Transform the weeklyWeather data into a format suitable for the chart.
   For each day, calculate the correct weekday name and date.
   extract temperature, weather icon, description, min and max temps. */

  const weatherData = weeklyWeather.map((day, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formattedDate = date.toLocaleDateString();
    return {
      day: daysOfWeek[(today.getDay() + i) % 7],
      temp: day.temp.day,
      icon: day.weather[0].icon,
      description: day.weather[0].description,
      date: formattedDate,
      min: day.temp.min,
      max: day.temp.max,
    };
  });

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: "2rem",
          textAlign: "center",
          margin: "50px 0",
          fontWeight: "normal",
          fontFamily: "Cursive",
        }}
      >
        Weekly Weather:
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 0,
          maxWidth: "100%",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        <LineChart
          width={800}
          height={400}
          data={weatherData}
          margin={{ top: 20, right: 80, left: 20, bottom: 80 }}
        >
          <CartesianGrid stroke="#ffffff" strokeDasharray="5 5" />
          <XAxis
            dataKey="day"
            tick={({ x, y, payload, index }) => (
              <DailyWeatherTick
                x={x}
                y={y}
                payload={payload}
                icon={weatherData[index].icon}
                date={weatherData[index].date}
              />
            )}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        </LineChart>
      </Box>
    </Box>
  );
}
export default WeeklyWeather;
