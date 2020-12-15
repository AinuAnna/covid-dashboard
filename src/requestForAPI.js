// const fetch = require('node-fetch');

const BASE_URL = `https://disease.sh/v3/covid-19/`;
const URLS = {
  Summary: `${BASE_URL}countries`,
  Historical: (country) => `${BASE_URL}historical/${country}?lastdays=all`,
  Total: `${BASE_URL}historical/all?lastdays=all`,
};
export default class RequestForAPI {
  constructor() {
    this.data = null;
  }

  static loadData(target) {
    return fetch(target).then((response) => response.json());
  }

  static async getSummary() {
    return RequestForAPI.loadData(URLS.Summary);
  }

  static async getHistorical(country) {
    return RequestForAPI.loadData(URLS.Historical(country));
  }

  static async getTotal() {
    return RequestForAPI.loadData(URLS.Total());
  }
}
