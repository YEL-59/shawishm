import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

import axiosInstance from "../../utils/axiosInstance";
import { usePatientChartContext } from "../../contexts/PatientChartContext";

const PatientsChart = () => {
  const chartRef = useRef(null);
  const { selectedDay, selectedMonth, selectedYear } = usePatientChartContext();
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axiosInstance.get("studies/");
        const studies = response.data.data;

        // Filter by selected day, month, and year if applicable
        const filteredStudies = studies.filter((study) => {
          const studyDate = new Date(study.date);
          return (
            (!selectedDay || studyDate.getDate() === selectedDay) &&
            (!selectedMonth || studyDate.getMonth() + 1 === selectedMonth) &&
            (!selectedYear || studyDate.getFullYear() === selectedYear)
          );
        });

        // Count occurrences of each modality
        const modalityCounts = filteredStudies.reduce((acc, study) => {
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
  }, [selectedDay, selectedMonth, selectedYear]); // Re-run when the selected values change

  useEffect(() => {
    if (chartData.labels.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy the previous chart before creating a new one
      if (window.patientsChartInstance) {
        window.patientsChartInstance.destroy();
      }

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

      // Store the chart instance globally to destroy it later
      window.patientsChartInstance = patientsChart;

      return () => {
        patientsChart.destroy(); // Cleanup on unmount or re-render
      };
    }
  }, [chartData]); // Re-run when chartData changes

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <canvas ref={chartRef} id="patientsChart"></canvas>
    </div>
  );
};

export default PatientsChart;
