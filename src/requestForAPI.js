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
    this.isGlobal = true;
    this.isAbsoluteValue = true;

    this.CurrentIndexOfIndicators = 0;
    this.indicators = ['cases', 'deaths', 'recovered'];
    this.currentIndicator = this.indicators[this.CurrentIndexOfIndicators];
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

  sortData() {
    this.data.sort((a, b) => b[this.currentIndicator] - a[this.currentIndicator]);
  }

  getCountriesWithLatLonAndCases() {
    return this.data
      .map((el) => {
        return {
          country: el.country,
          iso3: el.countryInfo.iso3,
          latLon: [el.countryInfo.lat, el.countryInfo.long],
          cases: this.getDataDependOnToggles(el),
        };
      })
      .sort((a, b) => b.cases - a.cases);
  }

  getCountriesAndCases() {
    return this.data.map((el) => {
      return {
        cases: this.getDataDependOnToggles(el),
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

  getDataDependOnToggles(currentCountry) {
    return this.isGlobal ? this.getGlobalData(currentCountry) : this.getTodayData(currentCountry);
  }

  static getCoef100kPopulation(currentCountry) {
    return currentCountry.population / 100000;
  }

  getGlobalData(currentCountry) {
    const coefficient = RequestForAPI.getCoef100kPopulation(currentCountry);
    return this.isAbsoluteValue
      ? currentCountry[this.currentIndicator]
      : (coefficient ? currentCountry[this.currentIndicator] / coefficient : 1).toFixed(2);
  }

  getTodayData(currentCountry) {
    const coefficient = RequestForAPI.getCoef100kPopulation(currentCountry);
    switch (this.currentIndicator) {
      case 'cases':
        return this.isAbsoluteValue
          ? currentCountry.todayCases
          : (coefficient !== 0 ? currentCountry.todayCases / coefficient : 1).toFixed(4);
      case 'deaths':
        return this.isAbsoluteValue
          ? currentCountry.todayDeaths
          : (coefficient !== 0 ? currentCountry.todayDeaths / coefficient : 1).toFixed(4);
      case 'recovered':
        return this.isAbsoluteValue
          ? currentCountry.todayRecovered
          : (coefficient !== 0 ? currentCountry.todayRecovered / coefficient : 1).toFixed(4);
      default:
        return false;
    }
  }

  getNewIndicator(direction) {
    const currentIndex =
      this.CurrentIndexOfIndicators + direction >= 0 && this.CurrentIndexOfIndicators + direction < 3
        ? this.CurrentIndexOfIndicators + direction
        : this.CurrentIndexOfIndicators;
    this.CurrentIndexOfIndicators = currentIndex;
    this.currentIndicator = this.indicators[currentIndex];
    return this.currentIndicator[0].toUpperCase() + this.currentIndicator.slice(1);
  }
}
