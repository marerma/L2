import { LS_KEY } from './config.js';
import {
  convertCollection,
  getLocalStorage,
  openPinDropDown,
  setLocalStorage,
} from './helpers.js';
import { createPin } from './pins.js';

function initMap() {
  ymaps.ready(init);
  function init() {
    // Создание карты.
    const myMap = new ymaps.Map('map', {
      // Координаты центра карты.

      center: [55.76, 37.64],
      zoom: 9,
    });

    const myGeoObjects = new ymaps.GeoObjectCollection(
      {},
      {
        preset: 'islands#redCircleIcon',
        strokeWidth: 4,
        geodesic: true,
      }
    );

    if (localStorage[LS_KEY]) {
      const savedPins = getLocalStorage(LS_KEY);
      savedPins.forEach((pin) => {
        const newPin = createPin(pin);
        myGeoObjects.add(newPin);
      });
    }
    // const myClusterer = new ymaps.Clusterer();
    // myClusterer.add(myGeoObjects);
    myMap.geoObjects.add(myGeoObjects);
    // открываем при клике на карте попап с формой для добавления пина рядом с кликом
    myMap.events.add('click', function (e) {
      // Получение координат щелчка на карте, чтобы передать в функицю создания метки
      const coords = e.get('coords');
      openPinDropDown(e, coords, myGeoObjects);
    });

    // настраиваем курсор на карте - стрелка
    const pointer = myMap.cursors.push('arrow');

    // отключение зума при двойном клике
    myMap.behaviors.disable('dblClickZoom');

    // слушаем события измнений в коллекции и сохраняем ее в локал сторадж при вызове этих событий
    myMap.geoObjects.events.add(
      ['add', 'remove', 'optionschange', 'propertieschange', 'dragend'],
      () => {
        setLocalStorage(LS_KEY, convertCollection(myGeoObjects));
      }
    );
  }
}

initMap();
