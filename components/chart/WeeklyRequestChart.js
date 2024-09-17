import { useEffect, useState } from "react";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const WeeklyRequestChart = () => {
  const [chartData, setChartData] = useState({
    categories: [
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jum'at",
      "Sabtu",
      "Minggu",
    ],
    data: [0, 0, 0, 0, 0, 0, 0],
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
          "https://gqk2bgt5-5001.asse.devtunnels.ms/admin/requests-per-week",
          { headers: { Authorization: `Bearer ${token}` } }
        ); // Adjust this URL based on your API endpoint
        const dayCounts = response.data;

        // Reorder data to match the chart's xAxis categories
        const dayOrder = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        const data = dayOrder.map((day) => dayCounts[day] || 0);

        setChartData({
          ...chartData,
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
      text: "Request Minggu ini",
      style: {
        color: "#2563EB", // This is the Tailwind CSS `text-blue-600` color code in hex.
      },
    },
    xAxis: {
      categories: [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jum'at",
        "Sabtu",
        "Minggu",
      ],
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
          "#FF4136", // Merah
          "#0074D9", // Biru
          "#FF851B", // Oranye
          "#2ECC40", // Hijau
          "#FFDC00", // Kuning
          "#B10DC9", // Ungu
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

export default WeeklyRequestChart;
