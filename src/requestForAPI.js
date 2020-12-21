const fetch = require('node-fetch');

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
    return RequestForAPI.loadData(URLS.Total);
  }

  setData(data) {
    this.data = data;
  }

  setTotalData(total) {
    this.total = total;
  }

  setHistoryData(history) {
    this.history = history;
  }

  getCountriesWithLatLonAndCases() {
    return this.data.map((el) => {
      return {
        country: el.country,
        iso3: el.countryInfo.iso3,
        latLon: [el.countryInfo.lat, el.countryInfo.long],
        cases: el.cases,
      };
    });
  }

  getCountriesAndCases() {
    return this.data.map((el) => {
      return {
        cases: el.cases,
        country: el.country,
        countryInfo: [el.countryInfo.flag],
      };
    });
  }

  getDeathsCases() {
    return this.data.map((el) => {
      return {
        deaths: el.deaths,
        country: el.country,
      };
    });
  }

  getRecoveredCases() {
    return this.data.map((el) => {
      return {
        recovered: el.recovered,
        country: el.country,
      };
    });
  }

  getLastDate() {
    return this.data.map((el) => {
      return {
        updated: el.updated,
      };
    });
  }

  getGlobalCases() {
    const merged = [
      ...new Set(Object.keys(this.total.cases), Object.keys(this.total.deaths), Object.keys(this.total.recovered)),
    ];
    return merged.map((el) => {
      return {
        date: new Date(el),
        cases: this.total.cases[el],
        deaths: this.total.deaths[el],
        recovered: this.total.recovered[el],
      };
    });
  }

  getHistoricalData() {
    const historyTimeline = this.history.timeline;
    const merged = [
      ...new Set(
        Object.keys(historyTimeline.cases),
        Object.keys(historyTimeline.deaths),
        Object.keys(historyTimeline.recovered)
      ),
    ];
    return merged.map((el) => {
      return {
        date: new Date(el),
        cases: historyTimeline.cases[el],
        deaths: historyTimeline.deaths[el],
        recovered: historyTimeline.recovered[el],
      };
    });
  }
}
