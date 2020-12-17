import L, { tooltip } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import geo from './custom.geo.json';

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

  addGeoJSON() {
    L.geoJSON(geo, { style: this.addStyle.call }).addTo(this.map);
  }

  addStyle(feature) {
    return {
      fillColor: this.getColor(feature.properties.sov_a3),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  }

  getColor(country) {
    console.log(country);
    const currentCountry = this.countries.filter((cur) => cur.iso3 === country);
    let result;
    if (currentCountry.cases > 10000000) {
      result = '#800026';
    } else if (currentCountry.cases > 1000000) {
      result = '#BD0026';
    } else if (currentCountry.cases > 100000) {
      result = '#E31A1C';
    } else if (currentCountry.cases > 10000) {
      result = '#FD8D3C';
    } else {
      result = '#FED976';
    }
    return result;
  }

  addCircle(country, arrayLatLon, cases) {
    const circle = L.circleMarker(arrayLatLon, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      opacity: 0.5,
      weight: 0.5,
      radius: 20,
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
      result = cases / 100;
    } else if (cases > 1000000) {
      result = cases / 50;
    } else if (cases > 100000) {
      result = cases / 30;
    } else if (cases > 10000) {
      result = cases / 20;
    } else {
      result = cases;
    }
    return result;
  }
}
