import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PatientsChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const patientsChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["CT", "BMD", "CX", "ST", "CT", "BMD", "CX", "ST"],
        datasets: [
          {
            label: "Patients",
            data: [100, 80, 60, 40, 80, 60, 80, 40],
            backgroundColor: "#4CAF50",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { maxRotation: 45, minRotation: 45, font: { size: 10 } },
          },
          y: {
            grid: { display: true },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: { labels: { font: { size: 10 } } },
          tooltip: { enabled: true },
        },
      },
    });

    // Cleanup function to destroy the chart instance
    return () => {
      patientsChart.destroy();
    };
  }, []);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <canvas ref={chartRef} id="patientsChart"></canvas>
    </div>
  );
};

export default PatientsChart;
