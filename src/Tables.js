const moment = require('moment');
// require
export default class Tables {
  constructor() {
    this.dataByCases = [];
    this.dataByDeaths = [];
    this.dataByRecovered = [];
    this.cases = null;
    this.item = 0;
    this.lastDate = 0;
  }

  updateTotal(className, value) {
    const div = document.querySelector(className);
    div.innerHTML = `<span>${value}</span>`;
  }

  setGlobalCases(cases) {
    this.cases = cases;
    this.dataGlobalCases = cases.reduce((acc, item) => {
      if (item.cases === null && undefined) {
        item.cases = this.item;
      }
      return acc + item.cases;
    }, 0);
    this.updateTotal('.global-cases', this.dataGlobalCases.toFixed(0));
  }

  createDivCases() {
    const TABLE = document.getElementById('cases-by-country');
    for (let i = 0; i < this.dataByCases.length; i += 1) {
      const createDivCases = document.createElement('div');
      createDivCases.className = 'country__table';
      createDivCases.setAttribute('data-country', this.dataByCases[i].country);
      createDivCases.innerHTML = `<span>${this.dataByCases[i].cases}</span><span>${this.dataByCases[i].country}  <img src="${this.dataByCases[i].countryInfo}" alt="${this.dataByCases[i].country}" width="25" height="15" /></span>`;
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
    this.createDivCases();
  }

  createDivDate(element) {
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
    this.createDivDate();
  }

  clearTables() {
    const clearTables = document.getElementById('cases-by-country'); // deaths, recovered
    while (clearTables.firstChild) {
      clearTables.removeChild(clearTables.firstChild);
    }
  }
}
