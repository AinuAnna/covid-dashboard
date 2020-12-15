import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default class Map {
  constructor() {
    this.createMap();
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

  static setCountry(country) {
    console.log(country);
  }

  static setLatLon(data) {
    console.log(data);
  }

  getLatLon(data) {
    this.Lat = data.Lat;
    this.Lon = data.Lon;
  }
}
