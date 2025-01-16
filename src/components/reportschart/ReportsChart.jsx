// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const ReportsChart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");

//     const reportsChart = new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//         datasets: [
//           {
//             label: "Verified",
//             data: [80, 60, 80, 60, 80, 60, 80, 60, 80, 60, 80, 60],
//             backgroundColor: "#4CAF50",
//             // hidden: true,
//           },
//           {
//             label: "Partial",
//             data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
//             backgroundColor: "#F44336",
//           },
//           {
//             label: "None",
//             data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
//             backgroundColor: "#2196F3",
//           },
//           {
//             label: "Completed but not varified",
//             data: [60, 80, 60, 80, 60, 80, 60, 80, 60, 80, 60, 80],
//             backgroundColor: "#FFEB3B",
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           x: {
//             grid: { display: false },
//             ticks: { maxRotation: 45, minRotation: 45, font: { size: 10 } },
//           },
//           y: {
//             grid: { display: true },
//             beginAtZero: true,
//           },
//         },
//         plugins: {
//           legend: { labels: { font: { size: 10 } } },
//           tooltip: { enabled: true },
//         },
//       },
//     });

//     // Cleanup function to destroy the chart instance
//     return () => {
//       reportsChart.destroy();
//     };
//   }, []);

//   return (
//     <div style={{ height: "400px", width: "100%" }}>
//       <canvas ref={chartRef} id="reportsChart"></canvas>
//     </div>
//   );
// };

// export default ReportsChart;




import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axiosInstance from "../../utils/axiosInstance";

const ReportsChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [visibleLabels, setVisibleLabels] = useState({}); // Track visibility of each label

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axiosInstance.get("studies/");
        const studies = response.data.data;

        // Count occurrences of each status_reported
        const statusCounts = studies.reduce((acc, study) => {
          const status = study.status_reported || "None";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // Prepare chart data
        const labels = Object.keys(statusCounts);
        const data = Object.values(statusCounts);

        setChartData({ labels, data });
        // Initialize visibility state for each label
        const initialVisibility = labels.reduce((acc, label) => {
          acc[label] = true; // Initially, all labels are visible
          return acc;
        }, {});
        setVisibleLabels(initialVisibility);
      } catch (error) {
        console.error("Error fetching studies:", error);
      }
    };

    fetchStudies();
  }, []);

  const toggleLabelVisibility = (label) => {
    setVisibleLabels((prev) => ({
      ...prev,
      [label]: !prev[label], 
    }));
  };

  useEffect(() => {
    if (chartData.labels.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      const filteredData = chartData.data.filter((_, index) => visibleLabels[chartData.labels[index]]);

      const reportsChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: chartData.labels.filter((label) => visibleLabels[label]),
          datasets: [
            {
             
              data: filteredData,
              backgroundColor: ["#4CAF50", "#F44336", "#2196F3", "#FFEB3B"],
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

      return () => {
        reportsChart.destroy();
      };
    }
  }, [chartData, visibleLabels]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <div>
        {chartData.labels.map((label) => (
          <button
            key={label}
            onClick={() => toggleLabelVisibility(label)}
            style={{
              margin: "5px",
              backgroundColor: visibleLabels[label] ? "#4CAF50" : "#F44336",
              color: "white",
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <canvas ref={chartRef} id="reportsChart"></canvas>
    </div>
  );
};

export default ReportsChart;


