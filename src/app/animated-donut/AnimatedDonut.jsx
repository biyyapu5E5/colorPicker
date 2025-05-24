'use client'

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function AnimatedDonut({ value, max, label, color }) {
  const [current, setCurrent] = useState(0);
  const percentage = (value / max) * 100;

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      if (progress <= percentage) {
        setCurrent(progress);
      } else {
        clearInterval(interval);
      }
    }, 10); // animation speed

    return () => clearInterval(interval);
  }, [percentage]);

  const data = {
    datasets: [
      {
        data: [current, 100 - current],
        backgroundColor: [color, "#2d2d2d"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: false,
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-15 h-15">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-sm font-bold">
          {value}
        </div>
      </div>
      <div className="text-sm text-gray-400 mt-2">{label}</div>
    </div>
  );
};