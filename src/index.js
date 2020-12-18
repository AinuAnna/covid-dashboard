import RequestForAPI from './requestForAPI';
import './sass/style.scss';
import Charts from './chart';

const chart = new Charts();
const requestForAPI = new RequestForAPI();

function update() {
  RequestForAPI.getSummary().then((data) => {
    requestForAPI.setData(data);
    RequestForAPI.getHistorical('india').then((history) => {
      requestForAPI.setData(history);
      chart.setData(requestForAPI.getHistoricalData());
    });
  });
}

update();
