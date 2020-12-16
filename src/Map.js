import L, { tooltip } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default class Map {
  constructor() {
    this.createMap();
    this.countries = null;
  }

  createMap() {
    this.map = L.map('map').setView([51.505, -0.09], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  addCircle(country, arrayLatLon, cases) {
    const circle = L.circle(arrayLatLon, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      opacity: 0.5,
      weight: 0.5,
      radius: Map.getRadius(cases),
    }).addTo(this.map);
    // const tooltip = L.tooltip(direction:)
    circle.bindTooltip(`${country}, ${cases}`);
  }

  setData(countries) {
    this.countries = countries;
  }

  paintCircle() {
    this.countries.map((el) => {
      return this.addCircle(el.country, el.latLon, el.cases);
    });
  }

  deleteAllMarkers() {
    // TODO:
  }

  static getRadius(cases) {
    let result;
    if (cases > 10000000) {
      result = cases / 10;
    } else if (cases > 1000000) {
      result = cases / 5;
    } else if (cases > 100000) {
      result = cases / 3;
    } else if (cases > 10000) {
      result = cases / 2;
    } else {
      result = cases;
    }
    return result;
  }
}
