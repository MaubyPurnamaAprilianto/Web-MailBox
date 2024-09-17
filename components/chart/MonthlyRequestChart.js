import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const MonthlyRequestChart = () => {
  const [chartData, setChartData] = useState({
    categories: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    data: Array(12).fill(0), // Initialize data array with 0 values for each month
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
          "https://gqk2bgt5-5001.asse.devtunnels.ms/admin/requests-per-month",
          { headers: { Authorization: `Bearer ${token}` } }
        ); // Adjust this URL based on your API endpoint
        const monthCounts = response.data;

        // Map the response to match the chart's xAxis categories
        const data = monthCounts.map(month => month.count);

        setChartData({
          categories: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ],
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
      text: "Request Bulan Ini",
      style: {
        color: "#2563EB", // This is the Tailwind CSS `text-blue-600` color code in hex.
      },
    },
    xAxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      title: {
        text: 'Bulan',
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

export default MonthlyRequestChart;
