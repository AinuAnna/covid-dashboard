import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import geo from './custom.geo.json';

export default class Map {
  constructor() {
    this.createMap();
    this.countries = null;
    this.createInfoBlock();

    this.grade = {
      First: 10000000,
      Second: 1000000,
      Third: 100000,
      Fourth: 10000,
      Fifth: 1000,
    };

    this.addStyle = (feature) => {
      return {
        fillColor: this.getColor(this.getCasesOfCountry(feature.properties.iso_a3)),
        weight: 1,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
      };
    };

    this.onEachFeature = (feature, layer) => {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
      });
    };

    this.highlightFeature = (event) => {
      this.layer = event.target;
      this.info.update(this.layer.feature.properties);
      this.layer.setStyle({
        fillOpacity: 0.5,
      });
    };

    this.resetHighlight = (event) => {
      this.geojson.resetStyle(event.target);
      this.info.update();
    };
  }

  static round(n) {
    return Math.round(n / 100) * 100;
  }

  setGrade() {
    const coef = this.countries[0].cases > 10000000 ? 10 : 5;
    const value = Math.round(this.countries[0].cases);
    this.grade = {
      First: value,
      Second: Map.round(value / coef),
      Third: Map.round(value / (coef * 10)),
      Fourth: Map.round(value / (coef * 100)),
      Fifth: Map.round(value / (coef * 1000)),
    };
  }

  createMap() {
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 2,
      minZoom: 2,
      zoomControl: false,
      maxBounds: [
        [90, -180],
        [-100, 230],
      ],
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    const zoom = L.control.zoom({ position: 'bottomleft' });
    zoom.addTo(this.map);
  }

  updateMap() {
    if (this.layerGroup !== undefined) this.layerGroup.removeLayer(this.geojson);

    this.geojson = L.geoJSON(geo, { style: this.addStyle, onEachFeature: this.onEachFeature });

    this.layerGroup = new L.LayerGroup();
    this.layerGroup.addTo(this.map);
    this.layerGroup.addLayer(this.geojson);
  }

  getCasesOfCountry(country) {
    const currentCountry = this.countries.filter((cur) => cur.iso3 === country);
    return currentCountry[0] === undefined ? '#fff' : currentCountry[0].cases;
  }

  getColor(number) {
    if (number <= this.grade.First && number > this.grade.Second) {
      return '#800026';
    }
    if (number <= this.grade.Second && number > this.grade.Third) {
      return '#BD0026';
    }
    if (number <= this.grade.Third && number > this.grade.Fourth) {
      return '#E31A1C';
    }
    if (number <= this.grade.Fourth && number > this.grade.Fifth) {
      return '#FD8D3C';
    }
    return '#FED976';
  }

  updateData(countries) {
    this.countries = countries;
    this.setGrade();
    this.updateMap();
    this.createLegend();
  }

  createInfoBlock() {
    this.info = L.control({ position: 'topright' });
    this.info.onAdd = () => {
      this.div = L.DomUtil.create('div', 'map-info');
      this.info.update();
      return this.div;
    };

    this.info.update = (props) => {
      const currentCountry = this.countries && props ? this.countries.filter((cur) => cur.iso3 === props.iso_a3) : 0;

      this.div.innerHTML =
        currentCountry[0] && props
          ? `${currentCountry[0].country} — ${currentCountry[0].cases}`
          : `Hover over a country`;
    };
    this.info.addTo(this.map);
  }

  createLegend() {
    this.legend = L.control({ position: 'bottomright' });

    this.legend.onAdd = () => {
      const div = document.querySelector('.map-legend') || L.DomUtil.create('div', 'map-info map-legend');
      div.innerHTML = '';
      const grades = [this.grade.First, this.grade.Second, this.grade.Third, this.grade.Fourth, this.grade.Fifth];
      grades.forEach((element, index) => {
        const container = L.DomUtil.create('div', 'map-legend__container');
        container.innerHTML += `<i style="background: ${this.getColor(element)}"></i> 
          ${element} 
          ${grades[index + 1] ? `—  ${grades[index + 1]}` : '-'}`;
        div.append(container);
      });
      return div;
    };

    this.legend.addTo(this.map);
  }
}
