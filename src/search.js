document.getElementById('search-country').oninput = function () {
  const search = this.value.trim().toLowerCase();
  const hideCountry = document.querySelectorAll('.country__table');
  if (search !== '') {
    hideCountry.forEach(function (elem) {
      if (elem.innerText.toLowerCase().search(search) === -1) {
        elem.classList.add('hide');
      } else {
        elem.classList.remove('hide');
      }
    });
  } else {
    hideCountry.forEach(function (elem) {
      elem.classList.remove('hide');
    });
  }
};
