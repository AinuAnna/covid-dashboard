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
    this.indicators = ['cases', 'death', 'recovered'];
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
    return RequestForAPI.loadData(URLS.Total());
  }

  setData(data) {
    this.data = data;
  }

  getCountriesWithLatLonAndCases() {
    return this.data.map((el) => {
      return {
        country: el.country,
        iso3: el.countryInfo.iso3,
        latLon: [el.countryInfo.lat, el.countryInfo.long],
        cases: this.getDataDependOnToggles(el),
      };
    });
  }

  getCountriesAndCases() {
    return this.data.map((el) => {
      return {
        cases: this.getDataDependOnToggles(el),
        country: el.country,
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

  getHistoricalData() {
    const dataTimeline = this.data.timeline;
    const merged = [
      ...new Set(
        Object.keys(dataTimeline.cases),
        Object.keys(dataTimeline.deaths),
        Object.keys(dataTimeline.recovered)
      ),
    ];
    return merged.map((el) => {
      return {
        date: new Date(el),
        cases: dataTimeline.cases[el],
        deaths: dataTimeline.deaths[el],
        recovered: dataTimeline.recovered[el],
      };
    });
  }

  getDataDependOnToggles(currentCountry) {
    return this.isGlobal ? this.getGlobalData(currentCountry) : this.getTodayData(currentCountry);
  }

  getGlobalData(currentCountry) {
    switch (this.currentIndicator) {
      case 'cases':
        return this.isAbsoluteValue
          ? currentCountry.cases
          : Math.round(currentCountry.population / currentCountry.cases);
      case 'death':
        return this.isAbsoluteValue
          ? currentCountry.deaths
          : Math.round(currentCountry.population / currentCountry.deaths);
      case 'recovered':
        return this.isAbsoluteValue
          ? currentCountry.recovered
          : Math.round(currentCountry.population / currentCountry.recovered);
      default:
        return false;
    }
  }

  getTodayData(currentCountry) {
    switch (this.currentIndicator) {
      case 'cases':
        return this.isAbsoluteValue
          ? currentCountry.todayCases
          : Math.round(currentCountry.population / currentCountry.todayCases);
      case 'death':
        return this.isAbsoluteValue
          ? currentCountry.todayDeaths
          : Math.round(currentCountry.population / currentCountry.todayDeaths);
      case 'recovered':
        return this.isAbsoluteValue
          ? currentCountry.todayRecovered
          : Math.round(currentCountry.population / currentCountry.todayRecovered);
      default:
        return false;
    }
  }

  getCases(currentCountry) {
    return this.isGlobal ? currentCountry.cases : currentCountry.todayCases;
  }

  getDeaths(currentCountry) {
    return this.isGlobal ? currentCountry.deaths : currentCountry.todayDeath;
  }
  /*
  getCountry() {

  } */

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
