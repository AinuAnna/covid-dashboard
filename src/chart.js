const Chart = require('chart.js');

const getMonthKey = (date) => `${date.getFullYear()}_${date.getMonth()}`;
export default class Charts {
  constructor() {
    this.months = [];
    this.dataSets = [];
  }

  setData(data) {
    this.initMonths();
    const grouppedData = data.flat().reduce((result, item) => {
      const date = new Date(item.date);
      const monthKey = getMonthKey(date);

      const monthData =
        result[monthKey] ||
        (result[monthKey] = {
          cases: 0,
          deaths: 0,
          recovered: 0,
        });
      monthData.cases += item.cases;
      monthData.deaths += item.deaths;
      monthData.recovered += item.recovered;

      return result;
    }, {});

    this.dataSets = [
      { key: 'cases', label: 'Active cases', borderColor: 'rgb(255, 99, 132)' },
      { key: 'deaths', label: 'Deaths cases', borderColor: 'rgb(55, 99, 132)' },
      { key: 'recovered', label: 'Recovered cases', borderColor: 'rgb(25, 99, 132)' },
    ].map((el) => ({
      ...el,
      data: this.months.map((month) => (grouppedData[getMonthKey(month)] || {})[el.key] || 0),
    }));

    this.render();
  }

  initMonths() {
    this.months = [];
    let date = new Date('2020-03-01T00:00:00Z');

    while (date <= new Date()) {
      this.months.push(date);

      date = new Date(date.getTime());
      date.setMonth(date.getMonth() + 1);
    }
  }

  render() {
    const MULTILINEONEFILL = global.document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(MULTILINEONEFILL, {
      type: 'line',
      data: {
        labels: this.months.map((x) => x.toLocaleString('default', { month: 'short' })),
        datasets: this.dataSets,
      },
      options: {},
    });
  }
}
