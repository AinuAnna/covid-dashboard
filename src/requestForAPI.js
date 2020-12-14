const BASE_URL = `https://api.covid19api.com/`;
const URLS = {
  Summary: `${BASE_URL}summary`,
  World: `${BASE_URL}world`,
  Live: (country) => `${BASE_URL}live/country/${country}`,
  Total: `${BASE_URL}world/total`,
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

  static async getLive(country) {
    return RequestForAPI.loadData(URLS.Live(country));
  }
}
