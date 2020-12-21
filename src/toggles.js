export default class Toggles {
  constructor() {
    this.data = 0;
  }

  setData(data) {
    this.data = data;
  }

  static createToggles() {
    document.querySelectorAll('.toggles').forEach((el) => {
      el.append(...Toggles.getSetOfToggles());
    });
  }

  static getSetOfToggles() {
    const toggleIndicator = Toggles.getDomElement('div', ['toggle-indicator']);
    const btnBack = Toggles.getDomElement('button', ['toggle-button-back'], '&lt;');
    const currentIndicator = Toggles.getDomElement('span', ['current-indicator'], 'Cases');
    const btnForth = Toggles.getDomElement('button', ['toggle-button-forth'], '&gt;');
    toggleIndicator.append(btnBack, currentIndicator, btnForth);

    const toggleGroup = Toggles.getDomElement('div', ['toggles-group']);

    const toggleSimpleFirst = Toggles.getDomElement('div', ['toggle-simple']);
    const toggleSimpleSecond = Toggles.getDomElement('div', ['toggle-simple']);

    const toggleBtnToTotal = Toggles.getDomElement(
      'button',
      ['toggle-button', 'button-total', 'toggle-active'],
      'Total'
    );

    const toggleBtnToToday = Toggles.getDomElement('button', ['toggle-button', 'button-today'], 'Today');

    const toggleBtnToAbsolute = Toggles.getDomElement(
      'button',
      ['toggle-button', 'button-absolute', 'toggle-active'],
      'Absolute'
    );

    const toggleBtnToPer100k = Toggles.getDomElement('button', ['toggle-button', 'button-per100k'], 'Per 100k');

    toggleSimpleFirst.append(toggleBtnToTotal, toggleBtnToToday);
    toggleSimpleSecond.append(toggleBtnToAbsolute, toggleBtnToPer100k);
    toggleGroup.append(toggleSimpleFirst, toggleSimpleSecond);

    return [toggleIndicator, toggleGroup];
  }

  static getDomElement(tagName, classesNames, value) {
    const element = document.createElement(tagName);
    element.classList.add(...classesNames);
    element.innerHTML = value || '';
    return element;
  }

  static getAllButtonsOfToggles() {
    const btnsBack = document.querySelectorAll('.toggle-button-back');
    const btnsForth = document.querySelectorAll('.toggle-button-forth');
    const btnsTotal = document.querySelectorAll('.button-total');
    const btnsToday = document.querySelectorAll('.button-today');
    const btnsAbsolute = document.querySelectorAll('.button-absolute');
    const btnsPer100k = document.querySelectorAll('.button-per100k');

    return [btnsBack, btnsForth, btnsTotal, btnsToday, btnsAbsolute, btnsPer100k];
  }

  static getAllFieldsIndicators() {
    return document.querySelectorAll('.current-indicator');
  }
}
