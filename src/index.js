import RequestForAPI from './requestForAPI';
import Table from './table';
import Charts from './chart';
import './sass/style.scss';

const table = new Table();
const chart = new Charts();
const requestForAPI = new RequestForAPI();

function FormatData(data) {
  const timeline = Object.keys(data.timeline.cases)
    .concat(Object.keys(data.timeline.deaths))
    .concat(Object.keys(data.timeline.recovered));
  const dates = timeline.filter(
    (item, index) => timeline.indexOf(item) === index
  );
  const result = Object.assign(
    dates.map((key) => [
      {
        Date: new Date(key),
        Cases: data.timeline.cases[key],
        Deaths: data.timeline.deaths[key],
        Recovered: data.timeline.recovered[key],
      },
    ])
  );
  return result;
}

function FormatByCases(data) {
  data.sort(function (a, b) {
    return b.cases - a.cases;
  });
  return data;
}

function update() {
  RequestForAPI.getSummary().then((data) => {
    requestForAPI.setData(data);
    table.setGlobalCases(requestForAPI.getCountriesAndCases());
    table.setCasesByCountry(
      requestForAPI.getCountriesAndCases(FormatByCases(data))
    );
    table.setGlobalDeathsCases(requestForAPI.getDeathsCases());
    table.setCasesByDeaths(requestForAPI.getDeathsCases(FormatByCases(data)));
    RequestForAPI.getHistorical('india').then((history) => {
      requestForAPI.setData(history);
      chart.setData(requestForAPI.getHistoricalData());
    });
  });
}

update();
table.onClickCountry();
