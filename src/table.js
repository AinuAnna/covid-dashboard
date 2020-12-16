export default class Tables {
  constructor() {
    this.dataByCases = {};
  }

  // eslint-disable-next-line class-methods-use-this
  createDiv() {
    this.dataByCases.flat();
    console.log(this.dataByCases);
    this.dataByCases.map(() => {
      const TABLE = document.getElementById('cases-by-country');
      const createDiv = document.createElement('div');
      createDiv.className = 'country__table';
      createDiv.innerHTML = `<span>${this.dataByCases.cases}</span><span>${this.dataByCases.country}</span>`;
      TABLE.appendChild(createDiv);
    });
  }

  setCasesByCountry(data) {
    this.dataByCases = data.map((item) => {
      return {
        cases: item.cases,
        country: item.country,
      };
    });
    console.log(this.dataByCases);
    this.createDiv();
  }
}
