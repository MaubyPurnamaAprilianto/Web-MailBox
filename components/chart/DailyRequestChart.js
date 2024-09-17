import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const DailyRequestChart = () => {
  const [chartData, setChartData] = useState({
    categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()), // Dates 1 to 31
    data: Array(31).fill(0), // Initialize data array with 0 values
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gqk2bgt5-5001.asse.devtunnels.ms/admin/requests-per-day",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // console.log("API Response:", response.data); // Log API response

        const dayCountsArray = response.data;

        // Convert array to object with date strings as keys
        const dayCounts = dayCountsArray.reduce((acc, { date, count }) => {
          const dateString = `2024-09-${String(date).padStart(2, '0')}`; // Format date as 'YYYY-MM-DD'
          acc[dateString] = count;
          return acc;
        }, {});

        const data = Array.from({ length: 31 }, (_, i) => {
          const date = i + 1;
          const dateString = `2024-09-${String(date).padStart(2, '0')}`; // Format date as 'YYYY-MM-DD'
          const count = dayCounts[dateString] || 0;
          // console.log(`Date: ${dateString}, Count: ${count}`); // Log count
          return count;
        });

        setChartData({
          categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()), // Ensure categories are updated
          data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Permintaan Harian Bulan Ini",
      style: {
        color: "#2563EB", // Tailwind CSS `text-blue-600` color code in hex.
      },
    },
    xAxis: {
      categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()), // Dates 1 to 31
      title: {
        text: 'Tanggal',
      },
    },
    yAxis: {
      title: {
        text: 'Jumlah Permintaan',
      },
      tickInterval: 10, // This sets the interval of ticks on the y-axis
      min: 0, // Minimum value of y-axis
      max: 100, // Maximum value of y-axis
    },
    series: [
      {
        name: "Permintaan",
        data: chartData.data,
        colorByPoint: true,
        colors: [
          "#FF4136", // Red
          "#0074D9", // Blue
          "#FF851B", // Orange
          "#2ECC40", // Green
          "#FFDC00", // Yellow
          "#B10DC9", // Purple
          "#39CCCC", // Cyan
        ],
      },
    ],
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };
  

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-4xl mx-auto">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default DailyRequestChart;
