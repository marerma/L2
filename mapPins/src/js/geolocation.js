import { DEFAULT_MAP_CENTER, MAP } from './config.js';

// определяем местоположение пользователя,
// если это не получится, то добавим дефолтные координаты карты
export function createMapWithGeolocation() {
  const geolocation = ymaps.geolocation;
  return geolocation
    .get({
      provider: 'browser',
      mapStateAutoApply: true,
    })
    .then((result) => {
      const bounds = result.geoObjects.get(0).properties.get('boundedBy');
      const mapState = ymaps.util.bounds.getCenterAndZoom(bounds, [
        MAP.getComputedStyle('width'),
        MAP.getComputedStyle('height'),
      ]);
      return mapState;
    })
    .catch((e) => {
      const mapState = {
        center: DEFAULT_MAP_CENTER,
        zoom: 9,
      };
      return mapState;
    });
}
