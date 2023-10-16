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
