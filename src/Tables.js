const moment = require('moment');

export default class Tables {
  constructor() {
    this.dataByCases = [];
    this.dataByDeaths = [];
    this.dataByRecovered = [];
    this.cases = null;
    this.lastDate = 0;
    this.stylesForFlag = '" width="25" height="12.5"';
  }

  static updateTotal(className, value) {
    const div = document.querySelector(className);
    div.innerHTML = `<span>${value}</span>`;
  }

  setGlobalCases(cases) {
    this.cases = cases;
    this.dataGlobalCases = cases.reduce((acc, item) => {
      if (!item.cases) {
        return acc;
      }
      return acc + item.cases;
    }, 0);
    Tables.updateTotal('.global-cases', this.dataGlobalCases.toFixed(0));
  }

  createDivCases() {
    const TABLE = document.getElementById('cases-by-country');
    for (let i = 0; i < this.dataByCases.length; i += 1) {
      const createDivCases = document.createElement('div');
      createDivCases.className = 'country__table';
      createDivCases.setAttribute('data-country', this.dataByCases[i].country);
      createDivCases.innerHTML = `<span>${this.dataByCases[i].cases}</span><span>${this.dataByCases[i].country}  <img src="${this.dataByCases[i].countryInfo}" alt="${this.dataByCases[i].country}${this.stylesForFlag}/></span>`;
      TABLE.appendChild(createDivCases);
    }
  }

  setCasesByCountry(cases) {
    this.cases = cases;
    this.dataByCases = cases.map((item) => {
      return {
        cases: item.cases,
        country: item.country,
        countryInfo: item.countryInfo,
      };
    });
  }

  static createDivDate(element) {
    const TABLE = document.getElementById('last-date');
    TABLE.innerHTML = `${moment(element).format('MMM Do YY')}`;
  }

  setLastDate(updated) {
    this.updated = updated;
    this.lastDate = updated.map((item) => {
      return {
        updated: item.updated,
      };
    });
  }

  static clearTables() {
    const clearTables = document.getElementById('cases-by-country');
    while (clearTables.firstChild) {
      clearTables.removeChild(clearTables.firstChild);
    }
  }
}
