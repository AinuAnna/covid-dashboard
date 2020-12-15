import RequestForAPI from './requestForAPI';
import './sass/style.scss';
import Chart from './chart';

const chart = new Chart();
function FormatData(data) {
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
  console.log(result);
  return result;
}

function update() {
  RequestForAPI.getSummary().then((data) => {
    console.log(data);
    RequestForAPI.getHistorical('belarus').then((data2) => {
      chart.setData(FormatData(data2));
    });
  });
}

update();
