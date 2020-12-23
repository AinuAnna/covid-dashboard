import { CHART_DATA } from './constants/CHART_DATA';

const Chart = require('chart.js');

export default class Charts {
  constructor() {
    this.days = [];
    this.chartData = [];
  }

  setData(data) {
    this.days = data.map((day) => new Date(day.date));

    this.chartData = [...CHART_DATA].map((el) => ({
      ...el,
      data: data.map((item) => item[el.key] || 0),
    }));
    this.render();
  }

  render() {
    let CHART = global.document.getElementById('myChart').getContext('2d');
    global.document.getElementById('myChart').remove();
    global.document.querySelector('.redraw').innerHTML = `<span class="content-box__title">Daily Cases</span>
   <canvas id="myChart" class="chart"></canvas>`;
    CHART = global.document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(CHART, {
      ...CHART_DATA,

      type: 'line',
      data: {
        labels: this.days,
        datasets: this.chartData,
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontSize: 12,
            fontStyle: 'normal',
            fontColor: '#f1f3fb',
          },
        },
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
              ticks: {
                fontColor: '#f1f3fb',
                fontSize: 14,
                fontStyle: 'normal',
              },
              time: {
                displayFormats: { month: 'MMM' },
                tooltipFormat: 'MMM ddd D',
                unit: 'month',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: '#f1f3fb',
                fontSize: 14,
                fontStyle: 'normal',
              },
            },
          ],
        },
      },
    });
    window.addEventListener('resize', function (event) {
      // do stuff here
      myChart.render();
    });
  }
}
