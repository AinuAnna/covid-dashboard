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

function updateCharts(selectedCountry) {
  if (selectedCountry) {
    RequestForAPI.getHistorical(selectedCountry).then((history) => {
      requestForAPI.setHistoryData(history);
      chart.setData(requestForAPI.getHistoricalData());
    });
  } else {
    RequestForAPI.getTotal().then((total) => {
      requestForAPI.setTotalData(total);
      chart.setData(requestForAPI.getGlobalCases());
    });
  }
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

  const recovered = requestForAPI.getRecoveredCases();
  table.setGlobalRecoveredCases(recovered);
  table.setCasesByRecovered(recovered);
}

function startApp() {
  RequestForAPI.getSummary().then((data) => {
    requestForAPI.setData(data);
    setTables(data);
    map.updateData(requestForAPI.getCountriesWithLatLonAndCases());
    updateCharts();
  });
}
function setupResizeButtons() {
  const buttons = global.document.querySelectorAll('.expand');

  buttons.forEach((el) =>
    el.addEventListener('click', function () {
      this.parentElement.classList.toggle('expanded');
    })
  );
}
function onClickCountry() {
  const elements = document.getElementById('cases-by-country');
  elements.addEventListener('click', (event) => {
    const selectedCountry = event.target.closest('div').dataset.country;
    updateCharts(selectedCountry);
  });
}
startApp();

setupResizeButtons();
onClickCountry();
