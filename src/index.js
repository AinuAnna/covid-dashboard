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
  data.sort((a, b) => b.cases - a.cases);
}

function onClickCountry() {
  const elements = document.getElementById('cases-by-country');
  elements.addEventListener('click', (event) => {
    console.log(event.target.closest('div').dataset.country); // TODO получили страну, можно использовать
  });
}

function setTables(data) {
  const global = requestForAPI.getCountriesAndCases();
  table.setGlobalCases(global);

  getSortedByCasesData(data);

  const sortedGlobal = requestForAPI.getCountriesAndCases();
  table.setCasesByCountry(sortedGlobal);

  const deaths = requestForAPI.getDeathsCases();
  table.setGlobalDeathsCases(deaths);
  table.setCasesByDeaths(deaths);
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
onClickCountry();
