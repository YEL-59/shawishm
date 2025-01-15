import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

import axiosInstance from "../../utils/axiosInstance";

const PatientsChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    // Fetch data from the API
    const fetchStudies = async () => {
      try {
        const response = await axiosInstance.get("studies/");
        const studies = response.data.data;

        // Count occurrences of each modality
        const modalityCounts = studies.reduce((acc, study) => {
          const modality = study.modality;
          if (modality) {
            acc[modality] = (acc[modality] || 0) + 1;
          }
          return acc;
        }, {});

        // Prepare chart data
        const labels = Object.keys(modalityCounts);
        const data = Object.values(modalityCounts);

        setChartData({ labels, data });
      } catch (error) {
        console.error("Error fetching studies:", error);
      }
    };

    fetchStudies();
  }, []);

  useEffect(() => {
    if (chartData.labels.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      const patientsChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Modality Count",
              data: chartData.data,
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
    }
  }, [chartData]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <canvas ref={chartRef} id="patientsChart"></canvas>
    </div>
  );
};

export default PatientsChart;
