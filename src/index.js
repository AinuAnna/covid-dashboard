import RequestForAPI from './requestForAPI';
import Map from './Map';
import './sass/style.scss';
// import Chart from './chart';

// const chart = new Chart();
const map = new Map();
const requestForAPI = new RequestForAPI();

function formatData(data) {
  const timeline = Object.keys(data.timeline.cases)
    .concat(Object.keys(data.timeline.deaths))
    .concat(Object.keys(data.timeline.recovered));
  const dates = timeline.filter((item, index) => timeline.indexOf(item) === index);
  const result = Object.assign(
    dates.map((key) => [
      {
        Date: new Date(key),
        Cases: data.timeline.cases[key],
        Deaths: data.timeline.deaths[key],
        Recovered: data.timeline.recovered[key],
      },
    ])
  );
  return result;
}

function update() {
  RequestForAPI.getSummary().then((data) => {
    requestForAPI.setData(data);
    //console.log(data);
    map.setData(requestForAPI.getCountriesWithLatLonAndCases());
    // map.paintCircle();
    map.addGeoJSON();
    RequestForAPI.getHistorical('belarus').then((data2) => {
      // chart.setData(FormatData(data2));
    });
  });
}

update();
