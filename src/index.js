import Map from './Map';
import RequestForAPI from './requestForAPI';
import './sass/style.scss';

// const map = new Map();

const live = RequestForAPI.getLive();

function update() {
  RequestForAPI.getSummary().then((data) => {
    Map.setCountry(data.Countries);
  });
}

update();
