import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CovidData from './CovidData';

export default class Map {
  constructor() {
    this.createMap();
    this.CovidData = new CovidData();
    this.countries = null;
    this.getCountries();
  }

  createMap() {
    this.map = L.map('map').setView([51.505, -0.09], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  addCircle() {
    const circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(this.map);
  }

  getCountries() {
    CovidData.loadData('summary')
      .then((data) => {
        this.date = data.Date;
        this.countries = data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      })
      .then(() => CovidData.loadData(`live/country/${this.countries[0].Slug}/status/confirmed/date/${this.date}`))
      .then((data) => {
        // this.getLatLon(data);
        console.log(data);
        console.log(this.date);
      });
  }

  getLatLon(data) {
    this.Lat = data.Lat;
    this.Lon = data.Lon;
  }
}
