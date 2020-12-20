import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import geo from './custom.geo.json';

const GRADE = {
  First: 10000000,
  Second: 1000000,
  Third: 100000,
  Fourth: 10000,
  Fifth: 1000,
};

export default class Map {
  constructor() {
    this.createMap();
    this.countries = null;
    this.createInfoBlock();
    this.createLegend();

    this.addStyle = (feature) => {
      return {
        fillColor: Map.getColor(this.getCasesOfCountry(feature.properties.iso_a3)),
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

  createMap() {
    this.map = L.map('map').setView([51.505, -0.09], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
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

  static getColor(number) {
    if (number > GRADE.First) {
      return '#800026';
    }
    if (number > GRADE.Second) {
      return '#BD0026';
    }
    if (number > GRADE.Third) {
      return '#E31A1C';
    }
    if (number > GRADE.Fourth) {
      return '#FD8D3C';
    }
    return '#FED976';
  }

  updateData(countries) {
    this.countries = countries;
    this.updateMap();
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
      const div = L.DomUtil.create('div', 'map-info map-legend');
      const grades = [GRADE.First, GRADE.Second, GRADE.Third, GRADE.Fourth, GRADE.Fifth];
      grades.forEach((element, index) => {
        const container = L.DomUtil.create('div', 'map-legend__container');
        container.innerHTML += `<i style="background: ${Map.getColor(element + 1)}"></i> 
          ${element} 
          ${grades[index + 1] ? `—  ${grades[index + 1]}` : '-'}`;
        div.append(container);
      });
      return div;
    };
    this.legend.addTo(this.map);
  }
}
