import RequestForAPI from './requestForAPI';
import Tables from './Tables';
import Charts from './chart';
import Map from './Map';
import Toggles from './toggles';
import search from './search';
import MainTable from './MainTable';
import './sass/style.scss';

const table = new Tables();
const chart = new Charts();
const map = new Map();
const requestForAPI = new RequestForAPI();
const mainTable = new MainTable();

Toggles.createToggles();

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

  table.setCasesByCountry(global);

  const deaths = requestForAPI.getDeathsCases();
  /*  table.setGlobalDeathsCases(deaths);
  table.setCasesByDeaths(deaths); */

  const recovered = requestForAPI.getRecoveredCases();
  /* table.setGlobalRecoveredCases(recovered);
  table.setCasesByRecovered(recovered); */

  const updated = requestForAPI.getLastDate();
  table.setLastDate(updated);
}

function startApp() {
  RequestForAPI.getSummary().then((data) => {
    requestForAPI.setData(data);
    requestForAPI.sortData();
    setTables(data);
    mainTable.updateData(...requestForAPI.getDataForTable('Global'));
    map.updateData(requestForAPI.getCountriesWithLatLonAndCases());
    updateCharts();
  });
}

function update() {
  requestForAPI.sortData();
  setTables(requestForAPI.data);
  map.updateData(requestForAPI.getCountriesWithLatLonAndCases());
  mainTable.updateData(...requestForAPI.getDataForTable());
}

function setupResizeButtons() {
  const buttons = global.document.querySelectorAll('.expand');

  buttons.forEach((el) =>
    el.addEventListener('click', function () {
      this.parentElement.classList.toggle('expanded');
    })
  );
}
function clearActive(element) {
  const childs = element.querySelectorAll('.active');
  childs.forEach((el) => {
    el.classList.remove('active');
  });
}
function onClickCountry() {
  const elements = document.getElementById('cases-by-country');
  elements.addEventListener('click', (event) => {
    const selectedCountry = event.target.closest('div').dataset.country;
    const previousActiveElement = event.target.closest('div').parentElement.querySelector('.active');
    const previousContry = !!previousActiveElement && previousActiveElement.dataset.country;
    if (previousContry === selectedCountry) {
      updateCharts();
      mainTable.updateData(...requestForAPI.getDataForTable('Global'));
    } else {
      clearActive(event.target.closest('div').parentElement);
      updateCharts(selectedCountry);
      mainTable.updateData(...requestForAPI.getDataForTable(selectedCountry));
    }
    event.target.closest('div').classList.toggle('active');
  });
}

function updateFieldsIndicators(fields, direction) {
  const currentIndicator = requestForAPI.getNewIndicator(direction);
  fields.forEach((field) => {
    const f = field;
    f.innerHTML = currentIndicator;
  });
}

function switchButton(btnActive, btnInactive) {
  btnActive.forEach((btn) => {
    btn.classList.add('toggle-active');
  });
  btnInactive.forEach((btn) => {
    btn.classList.remove('toggle-active');
  });
}

function setToggles() {
  const ArrayOfButtons = Toggles.getAllButtonsOfToggles();
  const fieldsIndicators = Toggles.getAllFieldsIndicators();
  const btnsBack = ArrayOfButtons[0];
  const btnsForth = ArrayOfButtons[1];
  const btnsTotal = ArrayOfButtons[2];
  const btnsToday = ArrayOfButtons[3];
  const btnsAbsolute = ArrayOfButtons[4];
  const btnsPer100k = ArrayOfButtons[5];
  btnsBack.forEach((btn) => {
    btn.addEventListener('click', () => {
      updateFieldsIndicators(fieldsIndicators, -1);
      update();
    });
  });
  btnsForth.forEach((btn) => {
    btn.addEventListener('click', () => {
      updateFieldsIndicators(fieldsIndicators, 1);
      update();
    });
  });
  btnsTotal.forEach((btn) => {
    btn.addEventListener('click', () => {
      requestForAPI.isGlobal = true;
      update();
      switchButton(btnsTotal, btnsToday);
    });
  });
  btnsToday.forEach((btn) => {
    btn.addEventListener('click', () => {
      requestForAPI.isGlobal = false;
      update();
      switchButton(btnsToday, btnsTotal);
    });
  });
  btnsAbsolute.forEach((btn) => {
    btn.addEventListener('click', () => {
      requestForAPI.isAbsoluteValue = true;
      update();
      switchButton(btnsAbsolute, btnsPer100k);
    });
  });
  btnsPer100k.forEach((btn) => {
    btn.addEventListener('click', () => {
      requestForAPI.isAbsoluteValue = false;
      update();
      switchButton(btnsPer100k, btnsAbsolute);
    });
  });
}

startApp();
setupResizeButtons();
onClickCountry();

setToggles();
