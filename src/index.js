import RequestForAPI from './requestForAPI';
import './sass/style.css';

const live = RequestForAPI.getLive();

function update() {
  RequestForAPI.getSummary().then((data) => {
    // здесь что-то делаем
  });
}

update();
