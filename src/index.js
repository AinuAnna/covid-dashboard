import RequestForAPI from './requestForAPI';
import './sass/style.scss';

const live = RequestForAPI.getLive();

function update() {
  RequestForAPI.getSummary().then((data) => {
    // здесь что-то делаем
  });
}

update();
