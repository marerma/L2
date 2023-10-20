import { getFormValue, setPosition } from './helpers.js';
import { DEFAULT_COLOR, DEFAULT_ICON, MAP } from './config.js';
import { createPin } from './pins.js';

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
      console.error(e.message);
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
    <span class="close__icon"> x </span>
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

// функция поиска меток по введенному слову в форме поиска
export function searchPins(map) {
  const searchForm = document.forms.filterPins;

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = searchForm.elements.search.value.trim();
    if (value) {
      searchForm.elements.reset.style.display = 'block';
      searchMap(map, value);
    }
  });

  // при сбросе фильтра возвращаем все метки обратно на карту
  searchForm.addEventListener('reset', function (e) {
    e.preventDefault();
    searchMap(map);
    searchForm.elements.search.value = '';
    searchForm.elements.reset.style.display = 'none';
  });
}

// функция поиска по карте и установки видимости метки в зависимости от того, есть ли в ее описании слово поиска
function searchMap(map, value) {
  const result = ymaps.geoQuery(map.geoObjects);
  if (!value) {
    result.setOptions('visible', true);
  } else {
    result
      .setOptions('visible', false)
      .search(`properties.body rlike "${value}"`)
      .setOptions('visible', true);
  }
}
