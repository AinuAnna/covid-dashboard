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

  updateViewDivs(currentIndicator, isGlobal) {
    this.arrAllDiv.map((el) => el.classList.remove('field-select'));
    switch (currentIndicator) {
      case 'cases':
        isGlobal ? this.divCases.classList.add('field-select') : this.divTodayCases.classList.add('field-select');
        break;
      case 'deaths':
        isGlobal ? this.divDeaths.classList.add('field-select') : this.divTodayDeaths.classList.add('field-select');
        break;
      case 'recovered':
        isGlobal
          ? this.divRecovered.classList.add('field-select')
          : this.divTodayRecovered.classList.add('field-select');
        break;
      default:
        break;
    }
  }

  findAllId() {
    this.currentCountry = document.getElementById('current-country');
    this.divCases = document.getElementById('table-cases');
    this.divDeaths = document.getElementById('table-deaths');
    this.divRecovered = document.getElementById('table-recovered');
    this.divTodayCases = document.getElementById('table-today-cases');
    this.divTodayDeaths = document.getElementById('table-today-deaths');
    this.divTodayRecovered = document.getElementById('table-today-recovered');
    this.divCases.classList.add('field-select');
    this.arrAllDiv = [
      this.divCases,
      this.divDeaths,
      this.divRecovered,
      this.divTodayCases,
      this.divTodayDeaths,
      this.divTodayRecovered,
    ];
  }
}
