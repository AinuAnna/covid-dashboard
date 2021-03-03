document.getElementById('search-country').oninput = function () {
  const search = this.value.trim().toLowerCase();
  const countries = document.querySelectorAll('.country__table');
  if (search !== '') {
    countries.forEach(function (elem) {
      if (elem.innerText.toLowerCase().search(search) === -1) {
        elem.classList.add('hidden');
      } else {
        elem.classList.remove('hidden');
      }
    });
  } else {
    countries.forEach(function (elem) {
      elem.classList.remove('hidden');
    });
  }
};
