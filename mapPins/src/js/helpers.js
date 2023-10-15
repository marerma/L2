import { DEFAULT_COLOR, DEFAULT_ICON, MAP } from './config.js';
import { createPin } from './pins.js';

// вспомогательная функ-я для создания элемента
export function createElement(tag, className) {
  const node = document.createElement(tag);
  if (className) {
    node.classList = className;
  }
  return node;
}

// получение координаты клика на карте (именно позиция курсора на странице)
export function getCursorPosition(e) {
  return e.get('domEvent').get('position');
}

// установить позицию дом-элемента в необходимые координаты
export function setPosition(pinNode, e) {
  const [clientX, clientY] = getCursorPosition(e);
  pinNode.style.top = clientY + 'px';
  pinNode.style.left = clientX + 'px';
}

// впомогательная функция для получения значения поля формы
export function getFormValue(form, key) {
  return form.elements[key];
}

// получить данные формы - информация о метке
export function getPinInfo(form) {
  return {
    title: getFormValue(form, 'pin-title').value || '',
    body: getFormValue(form, 'pin-body').value || '',
    color: getFormValue(form, 'pin-color').value || DEFAULT_COLOR,
    iconType: getFormValue(form, 'pin-type').value || DEFAULT_ICON,
  };
}

// создаем попап с формой для сбора информации о пине
// при отправке формы метка добавляется на карту

export function createPinDrop(handleSubmit) {
  const templ = document.getElementById('drop').content.cloneNode(true);
  const pinDrop = templ.querySelector('.drop__container');
  const closeIcon = pinDrop.querySelector('.close__icon');
  const form = pinDrop.querySelector('form');

  closeIcon.addEventListener('click', () => {
    setTimeout(() => {
      pinDrop.remove();
    }, 100);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pinData = getPinInfo(form);
    try {
      handleSubmit(pinData);
    } catch (e) {
      console.log(e.message);
    } finally {
      pinDrop.remove();
    }
  });

  return pinDrop;
}

// открываем меню добавления метки и встраиваем в дом рядом с кликом (курсором)
export function openPinDropDown(event, coords, collection) {
  const handleSubmit = (pinData) => {
    const point = createPin({ coordinates: coords, ...pinData });
    collection.add(point);
  };
  const pinDrop = createPinDrop(handleSubmit);
  setPosition(pinDrop, event);
  MAP.append(pinDrop);
}

// формируем html для разметки подсказки
export function getHintHtml(title, body) {
  const html =
    '<div class="hint__container">' +
    `<p class="hint hint_title">${title}</p>` +
    `<p class="hint">${body}</p>` +
    '</div>';
  return title || body ? html : '';
}

// формируем разметку для окна редактирования метки
export function getBaloonContent() {
  const html = `<div class="pin__container">
    <label for="pin-title">Название</label>
    <input type="text" id="pin-title" name="pin-title" placeholder="Название" class="pin__text">
    <label for="pin-body">Описание</label>
    <textarea id="pin-body" placeholder="Описание" rows="2" cols="24" name="pin-body" class="pin__text"></textarea>
    <p class="item__label">Цвет иконки</p>
    <div class="icon__type-container">
      <div class="icon__color">
        <input id="pin-blue" type="radio" name="pin-color" value="blue" class="icon__color" checked></input>
        <label for="pin-blue"></label>
      </div>
      <div class="icon__color">
        <input id="pin-red" type="radio" name="pin-color" value="red" class="icon__color"></input>
        <label for="pin-red"></label>
      </div>
      <div class="icon__color">
        <input id="pin-green" type="radio" name="pin-color" value="green" class="icon__color"></input>
        <label for="pin-green"></label>
      </div>
    </div>
  </div>
  <div class="btn__container">
  <button type="submit" name="pinSave" class="pin__save-btn">Сохранить</button>
  <button type="button" name="pinDelete" class="pin__delete-btn">Удалить метку</button>
  </div>
  `;
  return html;
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// конвертируем коллекцию объектов в обычны массив с данными о метках
export function convertCollection(collection) {
  const pinsArray = collection.toArray();
  const arr = pinsArray.map((item) => {
    const { title, body, iconType, color } = item.properties.getAll();
    return {
      coordinates: item.geometry.getCoordinates(),
      title,
      body,
      iconType,
      color,
    };
  });
  return arr;
}
