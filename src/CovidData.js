const GENERAL_URL_API = 'https://api.covid19api.com/';
const SUMMARY_DATA = 'summary';

export default class CovidData {
  constructor() {
    this.global = null;
    this.countries = null;
    this.date = null;
    CovidData.loadData(SUMMARY_DATA).then((data) => this.setSummary(data));
    console.log(this.getCountries());
  }

  static loadData(target) {
    return fetch(`${GENERAL_URL_API}${target}`).then((response) => response.json());
  }

  async setSummary(data) {
    this.global = await data.Global;
    this.countries = await data.Countries;
    this.date = await data.Date;
  }

  getCountries() {
    return this.countries;
  }

  getGlobal() {
    return this.global;
  }

  getDate() {
    return this.date;
  }
}
