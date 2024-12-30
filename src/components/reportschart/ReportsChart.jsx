import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ReportsChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const reportsChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Verified",
            data: [80, 60, 80, 60, 80, 60, 80, 60, 80, 60, 80, 60],
            backgroundColor: "#4CAF50",
            // hidden: true,
          },
          {
            label: "Partial",
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            backgroundColor: "#F44336",
          },
          {
            label: "None",
            data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
            backgroundColor: "#2196F3",
          },
          {
            label: "Not Verified",
            data: [60, 80, 60, 80, 60, 80, 60, 80, 60, 80, 60, 80],
            backgroundColor: "#FFEB3B",
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
      reportsChart.destroy();
    };
  }, []);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <canvas ref={chartRef} id="reportsChart"></canvas>
    </div>
  );
};

export default ReportsChart;
