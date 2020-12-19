import RequestForAPI from './requestForAPI';
import Tables from './Tables';
import Charts from './chart';
import './sass/style.scss';

const table = new Tables();
const chart = new Charts();
const requestForAPI = new RequestForAPI();

function getSortedByCasesData(data) {
  data.sort((a, b) => {
    return b.cases - a.cases;
  });
  return data;
}

function onClickCountry() {
  const elements = document.getElementById('cases-by-country');
  elements.addEventListener('click', (event) => {
    console.log(event.target.closest('div').dataset.country); // TODO получили страну, можно использовать
  });
}

function setTables(data) {
  table.setGlobalCases(requestForAPI.getCountriesAndCases(data));
  table.setCasesByCountry(
    requestForAPI.getCountriesAndCases(getSortedByCasesData(data))
  );
  table.setGlobalDeathsCases(requestForAPI.getDeathsCases(data));
  table.setCasesByDeaths(
    requestForAPI.getDeathsCases(getSortedByCasesData(data))
  );
}

function update() {
  RequestForAPI.getSummary().then((data) => {
    requestForAPI.setData(data);
    setTables(data);
    RequestForAPI.getHistorical('india').then((history) => {
      requestForAPI.setData(history);
      chart.setData(requestForAPI.getHistoricalData());
    });
  });
}

update();
onClickCountry();
