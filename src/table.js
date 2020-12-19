export default class Tables {
  constructor() {
    this.dataByCases = [];
    this.dataByDeaths = [];
    this.cases = null;
  }

  createDivGlobal(element) {
    const TABLE = document.getElementById('global-cases');
    const createDivGlobal = document.createElement('div');
    createDivGlobal.innerHTML = `<span>${element}</span>`;
    TABLE.appendChild(createDivGlobal);
  }

  setGlobalCases(cases) {
    this.cases = cases;
    this.dataGlobalCases = cases.reduce((acc, item) => {
      return acc + item.cases;
    }, 0);
    this.createDivGlobal(this.dataGlobalCases);
  }

  createDivCases() {
    for (let i = 0; i < this.dataByCases.length; i += 1) {
      const TABLE = document.getElementById('cases-by-country');
      const createDivCases = document.createElement('div');
      createDivCases.className = 'country__table';
      createDivCases.setAttribute('data-cases', this.dataByCases[i].cases);
      createDivCases.innerHTML = `<span>${this.dataByCases[i].cases}</span><span>${this.dataByCases[i].country}</span>`;
      TABLE.appendChild(createDivCases);
    }
  }

  setCasesByCountry(cases) {
    this.cases = cases;
    this.dataByCases = cases.map((item) => {
      return {
        cases: item.cases,
        country: item.country,
      };
    });
    this.createDivCases();
  }

  createDivDeaths() {
    for (let i = 0; i < this.dataByDeaths.length; i += 1) {
      const TABLE = document.getElementById('deaths');
      const createDivDeaths = document.createElement('div');
      createDivDeaths.className = 'deaths__table';
      createDivDeaths.innerHTML = `<span>${this.dataByDeaths[i].deaths}</span><span>${this.dataByDeaths[i].country}</span>`;
      TABLE.appendChild(createDivDeaths);
    }
  }

  setCasesByDeaths(cases) {
    this.cases = cases;
    this.dataByDeaths = cases.map((item) => {
      return {
        deaths: item.deaths,
        country: item.country,
      };
    });
    this.createDivDeaths();
  }

  createDivGlobalDeaths(element) {
    const TABLE = document.getElementById('deaths');
    const createDivDeaths = document.createElement('div');
    createDivDeaths.className = 'dlobal-death';
    createDivDeaths.innerHTML = `<span>${element}</span>`;
    TABLE.appendChild(createDivDeaths);
  }

  setGlobalDeathsCases(deaths) {
    this.deaths = deaths;
    this.dataByDeaths = deaths.reduce((acc, item) => {
      return acc + item.deaths;
    }, 0);
    this.createDivGlobalDeaths(this.dataByDeaths);
  }

  // TODO Передача дата сет
  onClickCountry() {
    const elements = document.getElementById('cases-by-country');
    const element = document.getElementsByClassName('country__table');

    elements.addEventListener('click', () => {
      console.log(element);
      // this.createDivGlobal(element.dataset.cases);
    });
  }
}
