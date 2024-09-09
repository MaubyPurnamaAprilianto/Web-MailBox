import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const RequestStatusChart = () => {
  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '',
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
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: [
          {
            name: 'Proses',
            y: 12,
            sliced: true,
            selected: true,
            color: '#36A2EB', // Warna untuk Proses
          },
          {
            name: 'Rejected',
            y: 5,
            color: '#FF6384', // Warna untuk Rejected
          },
          {
            name: 'Pending',
            y: 3,
            color: '#FFCE56', // Warna untuk Pending
          },
        ],
      },
    ],
  };

  return (
      <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default RequestStatusChart;
