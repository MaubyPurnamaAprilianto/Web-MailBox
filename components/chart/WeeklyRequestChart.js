import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const WeeklyRequestChart = () => {
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Request Minggu ini',
    },
    xAxis: {
      categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Minggu'],
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    series: [{
      name: 'Request',
      data: [40, 20, 10, 30, 35, 45, 50],
      colorByPoint: true,
      colors: [
        '#FF4136', // Merah
        '#0074D9', // Biru
        '#FF851B', // Oranye
        '#2ECC40', // Hijau
        '#FFDC00', // Kuning
        '#B10DC9', // Ungu
        '#39CCCC', // Cyan
      ],
    }],
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
