// coordinates [1, 2]

import { BODY } from './config.js';
import { getBaloonContent, getHintHtml } from './pinMethods.js';
import { createElement, setPosition } from './helpers.js';

// создаем пин с необходимыми параметрами,
// также передаем в опции название метки, описание, тип иконки и цвет
// подключаем слушатели на события

export function createPin({
  coordinates,
  title,
  body,
  iconType,
  color = 'blue',
}) {
  const pin = new ymaps.GeoObject(
    {
      geometry: {
        type: 'Point',
        coordinates,
      },
      properties: {
        hintContent: getHintHtml(title, body),
        title,
        body,
        color,
        iconType,
      },
    },
    {
      draggable: true, // Метку можно перемещать.
      preset: `islands#${color}${iconType}Icon`,
      hasHint: true, // при наведении будет подсказка, если название или описание заполнены
      openEmptyHint: false,
    }
  );

  // при клике на правую кнопку можно редактирвоать метку или удалить ее
  // с помощью меню-попапа
  pin.events.add('contextmenu', function (e) {
    // Если меню метки уже отображено, то убираем его.
    const menuEl = document.getElementById('pin-menu');
    if (menuEl && menuEl.style.display === 'block') {
      menuEl.remove();
    } else {
      // HTML-содержимое контекстного меню.
      const menu = createElement('div', 'drop__container pin-menu');
      menu.id = 'pin-menu';
      menu.innerHTML = getBaloonContent();
      const closeIcon = menu.querySelector('.close__icon');
      closeIcon.addEventListener('click', () => {
        setTimeout(() => {
          menu.remove();
        }, 100);
      });

      // Размещаем контекстное меню на странице
      BODY.append(menu);

      // Задаем позицию меню.
      setPosition(menu, e);

      // Заполняем поля контекстного меню текущими значениями свойств метки.
      menu.querySelector('input[name="pin-title"]').value =
        pin.properties.get('title');
      menu.querySelector('textarea[name="pin-body"]').value =
        pin.properties.get('body');
      [...menu.querySelectorAll('input[name="pin-color"]')].find(
        (el) => el.value === pin.properties.get('color')
      ).checked = true;
      // При нажатии на кнопку "Сохранить" изменяем свойства метки
      // значениями, введенными в форме контекстного меню.
      menu.querySelector('button[type="submit"]').onclick = function () {
        const newName = menu.querySelector('input[name="pin-title"]').value;
        const newBody = menu.querySelector('textarea[name="pin-body"]').value;
        const newColor = [
          ...menu.querySelectorAll('input[name="pin-color"]'),
        ].find((el) => el.checked).value;

        pin.properties.set({
          title: newName,
          body: newBody,
          color: newColor,
          hintContent: getHintHtml(newName, newBody),
        });
        pin.options.set({
          preset: `islands#${newColor}${pin.properties.get('iconType')}Icon`,
          hasHint: Boolean(title || body),
        });

        // Удаляем контекстное меню.
        menu.remove();
      };

      // удаление метки
      menu.querySelector('button[name="pinDelete"]').onclick = function () {
        // получаем родительскую коллекцию и удалем метку из коллекции объектов
        const collection = pin.getParent();
        collection.remove(pin);
        // Удаляем контекстное меню.
        menu.remove();
      };
    }
  });
  return pin;
}
