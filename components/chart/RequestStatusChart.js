import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const RequestStatusChart = () => {
  const [chartData, setChartData] = useState([]);

  // Fetch status counts from the backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    const fetchStatusCounts = async () => {
      try {
        const response = await axios.get('https://gqk2bgt5-5001.asse.devtunnels.ms/admin/request-status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.map(item => {
          let color;
          switch (item.status) {
            case 'Proses':
              color = '#36A2EB';
              break;
            case 'Rejected':
              color = '#FF6384';
              break;
            case 'Pending':
              color = '#FFCE56';
              break;
            case 'Approved': // Note 'Approved' instead of 'Approve' from backend
              color = '#4CAF50';
              break;
            default:
              color = '#cccccc'; // Default color if no match
          }
          return {
            name: item.status,
            y: item.count,
            color,
            sliced: item.status === 'Proses', // Example: slice the 'Proses' piece
            selected: item.status === 'Proses', // Example: select the 'Proses' piece
          };
        });

        setChartData(data);
      } catch (error) {
        console.error('Error fetching status counts:', error);
      }
    };

    fetchStatusCounts();
  }, []);

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: ' ',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    credits: {
      enabled: false, // Disable the "highcharts.com" text
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: chartData, // Use fetched data here
      },
    ],
  };
  

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default RequestStatusChart;
