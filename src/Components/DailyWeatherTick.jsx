import React from "react";
function DailyWeatherTick({ x, y, payload, icon, date }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="black">
        {payload.value}
      </text>
      <text x={-25} y={35}>
        {date}
      </text>
      <image
        href={`/pictures/${icon}.png`}
        width="30"
        height="30"
        x={-10}
        y={40}
      />
    </g>
  );
}
export default DailyWeatherTick;
