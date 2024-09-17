import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const YearlyRequestChart = () => {
  const [chartData, setChartData] = useState({
    categories: [
      "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030",
    ], // Years
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],       // Request counts
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
          "https://gqk2bgt5-5001.asse.devtunnels.ms/admin/requests-per-year",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Parse response data
        const yearCounts = response.data;
        console.log(yearCounts);

        // Prepare data for the chart
        const categories = Object.keys(yearCounts); // Years
        const data = Object.values(yearCounts); // Counts

        setChartData({
          categories,
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
      text: "Request Per Tahun",
      style: {
        color: "#2563EB", // Tailwind CSS `text-blue-600` color code in hex.
      },
    },
    xAxis: {
      categories: chartData.categories,
      title: {
        text: 'Tahun',
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
        name: "Request",
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

export default YearlyRequestChart;
