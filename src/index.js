import RequestForAPI from './requestForAPI';
import Table from './table';
import Charts from './chart';
import './sass/style.scss';

const table = new Table();
const chart = new Charts();
const requestForAPI = new RequestForAPI();

function getSortedByCasesData(data) {
  data.sort((a, b) => {
    return b.cases - a.cases;
  });
  return data;
}

function update() {
  RequestForAPI.getSummary().then((data) => {
    requestForAPI.setData(data);
    table.setGlobalCases(requestForAPI.getCountriesAndCases());
    table.setCasesByCountry(
      requestForAPI.getCountriesAndCases(getSortedByCasesData(data))
    );
    table.setGlobalDeathsCases(requestForAPI.getDeathsCases());
    table.setCasesByDeaths(
      requestForAPI.getDeathsCases(getSortedByCasesData(data))
    );
    RequestForAPI.getHistorical('india').then((history) => {
      requestForAPI.setData(history);
      chart.setData(requestForAPI.getHistoricalData());
    });
  });
}

update();
table.onClickCountry();
