import RequestForAPI from './requestForAPI';
import Tables from './Tables';
import Charts from './chart';
import Map from './Map';
import './sass/style.scss';

const table = new Tables();
const chart = new Charts();
const map = new Map();
const requestForAPI = new RequestForAPI();

function getSortedByCasesData(data) {
  data.sort((a, b) => {
    return b.cases - a.cases;
  });
  return data;
}

function setTables(data) {
  table.setGlobalCases(requestForAPI.getCountriesAndCases(data));
  getSortedByCasesData(data);
  table.setCasesByCountry(requestForAPI.getCountriesAndCases());
  table.setGlobalDeathsCases(requestForAPI.getDeathsCases(data));
  table.setCasesByDeaths(requestForAPI.getDeathsCases());
}

function update() {
  RequestForAPI.getSummary().then((data) => {
    requestForAPI.setData(data);
    setTables(data);
    map.updateData(requestForAPI.getCountriesWithLatLonAndCases());
    RequestForAPI.getHistorical('india').then((history) => {
      requestForAPI.setData(history);
      chart.setData(requestForAPI.getHistoricalData());
    });
  });
}

update();
table.lisener();
