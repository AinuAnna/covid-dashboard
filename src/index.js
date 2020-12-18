import RequestForAPI from './requestForAPI';
import './sass/style.scss';

const live = RequestForAPI.getLive();

function update() {
  RequestForAPI.getSummary().then((data) => {
    // здесь что-то делаем
  });
}

function setupResizeButtons() {
  const boxes = global.document.querySelectorAll('.content-box');

  function toggleButton() {
    this.parentElement.classList.toggle('expanded');
  }

  boxes.forEach((el) =>
    el.addEventListener('mousemove', function () {
      const span = this.querySelector('span');
      span.classList.add('expand');
      span.addEventListener('click', toggleButton);
    })
  );
  boxes.forEach((el) =>
    el.addEventListener('mouseleave', function () {
      const span = this.querySelector('span');
      span.classList.remove('expand');
      span.removeEventListener('click', toggleButton);
    })
  );
}
update();

setupResizeButtons();
