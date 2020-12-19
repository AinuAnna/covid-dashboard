import RequestForAPI from './requestForAPI';
import './sass/style.scss';

const live = RequestForAPI.getLive();

function update() {
  RequestForAPI.getSummary().then((data) => {
    // здесь что-то делаем
  });
}

function setupResizeButtons() {
  const buttons = global.document.querySelectorAll('.expand');

  buttons.forEach((el) =>
    el.addEventListener('click', function () {
      this.parentElement.classList.toggle('expanded');
    })
  );
}
update();

setupResizeButtons();
