export default class RequestForAPI {
  constructor() {
    this.url = `https://api.covid19api.com/`;
    this.sortedData = [];
    this.getData('summary');
  }

  getData(value) {
    fetch(`${this.url}${value}`)
      .then((response) => response.json())
      .then((data) => {
        const { Global, Countries, Date } = data;

        Countries.sort(function (a, b) {
          return b.TotalConfirmed - a.TotalConfirmed;
        }).forEach((country) => {
          this.sortedData.push(country);
        });
      });
    return this.sortedData;
  }
}
