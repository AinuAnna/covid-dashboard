const Chart = require('chart.js');

const DATASETS = [
  { key: 'cases', label: 'Active cases', borderColor: '#FD8D3C' },
  { key: 'deaths', label: 'Deaths cases', borderColor: '#E31A1C' },
  { key: 'recovered', label: 'Recovered cases', borderColor: '#FED976' },
];

export default class Charts {
  constructor() {
    this.days = [];
    this.chartData = [];
  }

  setData(data) {
    this.days = data.map((day) => new Date(day.date));

    this.chartData = DATASETS.map((el) => ({
      ...el,
      data: data.map((item) => item[el.key] || 0),
    }));

    this.render();
  }

  render() {
    const CHART = global.document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(CHART, {
      type: 'line',
      data: {
        labels: this.days,
        datasets: this.chartData,
      },
      options: {
        elements: {
          point: {
            radius: 0,
          },
        },
        animation: {
          easing: 'easeOutCirc',
          duration: 1000,
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              position: 'bottom',
              time: {
                displayFormats: { month: 'MMM' },
                tooltipFormat: 'ddd D',
                unit: 'month',
              },
            },
          ],
        },
      },
    });
  }
}
