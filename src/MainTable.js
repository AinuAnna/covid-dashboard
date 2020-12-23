export default class MainTable {
  constructor() {
    this.findAllId();
  }

  updateData(cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, currentCountry = 'Global') {
    this.currentCountry.innerHTML = currentCountry;
    this.divCases.innerHTML = cases;
    this.divDeaths.innerHTML = deaths;
    this.divRecovered.innerHTML = recovered;
    this.divTodayCases.innerHTML = `+${todayCases}`;
    this.divTodayDeaths.innerHTML = `+${todayDeaths}`;
    this.divTodayRecovered.innerHTML = `+${todayRecovered}`;
  }

  findAllId() {
    this.currentCountry = document.getElementById('current-country');
    this.divCases = document.getElementById('table-cases');
    this.divDeaths = document.getElementById('table-deaths');
    this.divRecovered = document.getElementById('table-recovered');
    this.divTodayCases = document.getElementById('table-today-cases');
    this.divTodayDeaths = document.getElementById('table-today-deaths');
    this.divTodayRecovered = document.getElementById('table-today-recovered');
  }
}
