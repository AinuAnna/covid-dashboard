const Chart = require('chart.js');

const getMonthKey = (date) => `${date.getFullYear()}_${date.getMonth()}`;

export default class Charts {
  constructor() {
    this.monthes = [];
    this.dataSets = [];
  }

  setData(data) {
    this.initMonthes();
    const grouppedData = data.flat().reduce((result, item) => {
      const date = new Date(item.Date);
      const monthKey = getMonthKey(date);

      const monthData =
        result[monthKey] ||
        (result[monthKey] = {
          Cases: 0,
          Deaths: 0,
          Recovered: 0,
        });
      monthData.Cases += item.Cases;
      monthData.Deaths += item.Deaths;
      monthData.Recovered += item.Recovered;

      return result;
    }, {});

    this.dataSets = [
      { key: 'Cases', label: 'Cases cases', borderColor: 'rgb(255, 99, 132)' },
      { key: 'Deaths', label: 'Deaths cases', borderColor: 'rgb(55, 99, 132)' },
      { key: 'Recovered', label: 'Recovered cases', borderColor: 'rgb(25, 99, 132)' },
    ].map((x) => ({
      ...x,
      data: this.monthes.map((month) => (grouppedData[getMonthKey(month)] || {})[x.key] || 0),
    }));

    this.render();
  }

  initMonthes() {
    this.monthes = [];
    let date = new Date('2020-04-01T00:00:00Z');

    while (date <= new Date()) {
      this.monthes.push(date);

      date = new Date(date.getTime());
      date.setMonth(date.getMonth() + 1);
    }
  }

  render() {
    const MULTILINEONEFILL = global.document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(MULTILINEONEFILL, {
      type: 'line',
      data: {
        labels: this.monthes.map((x) => x.toLocaleString('default', { month: 'short' })),
        datasets: this.dataSets,
      },
      options: {},
    });
  }
}
