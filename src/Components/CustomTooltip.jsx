import React from "react";
import { Box, Typography } from "@mui/material";
function CustomTooltip({ active, payload, label }) {
  /* If the tooltip is active and there's payload data,
    display a custom tooltip with the weather description and min-max temperature range.*/
  if (active && payload && payload.length) {
    return (
      <Box>
        <Typography sx={{ fontWeight: "bold" }}>
          {payload[0].payload.description}
        </Typography>
        <Typography sx={{ marginBottom: "2px" }}>
          {payload[0].payload.min}°C - {payload[0].payload.max}°C
        </Typography>
      </Box>
    );
  }
}
export default CustomTooltip;
