import { LS_KEY } from './config.js';
import { createMapWithGeolocation } from './geolocation.js';
import {
  convertCollection,
  getLocalStorage,
  setLocalStorage,
} from './helpers.js';
import { openPinDropDown, searchPins } from './pinMethods.js';
import { createPin } from './pins.js';

function initMap() {
  ymaps.ready(init);
  function init() {
    // Создание карты с определением местоположения пользователя.
    createMapWithGeolocation().then((state) => {
      const myMap = new ymaps.Map('map', state);

      // настраиваем курсор на карте - стрелка
      const pointer = myMap.cursors.push('arrow');

      // отключение зума при двойном клике
      myMap.behaviors.disable('dblClickZoom');

      // создаем коллекцию объектов
      const myGeoObjects = new ymaps.GeoObjectCollection(
        {},
        {
          preset: 'islands#redCircleIcon',
          strokeWidth: 4,
          geodesic: true,
        }
      );

      // если в локальном хранилище есть метки, то грузим их в коллекцию
      if (localStorage[LS_KEY]) {
        const savedPins = getLocalStorage(LS_KEY);
        savedPins.forEach((pin) => {
          const newPin = createPin(pin);
          myGeoObjects.add(newPin);
        });
      }

      myMap.geoObjects.add(myGeoObjects);

      // открываем при клике на карте попап с формой для добавления пина рядом с кликом
      myMap.events.add('click', function (e) {
        // Получение координат щелчка на карте, чтобы передать в функицю создания метки
        const coords = e.get('coords');
        openPinDropDown(e, coords, myGeoObjects);
      });

      // слушаем события измнений в коллекции и сохраняем ее в локал сторадж при вызове этих событий
      myMap.geoObjects.events.add(
        ['add', 'remove', 'optionschange', 'propertieschange', 'dragend'],
        () => {
          setLocalStorage(LS_KEY, convertCollection(myGeoObjects));
        }
      );

      searchPins(myMap);
    });
  }
}

initMap();
