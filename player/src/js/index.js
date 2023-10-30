import { PlayList } from './PlayListClass.js';
import PLAY_LIST_DEFAULT from './playlist.js';
import { handleLocalStorage } from './helpers.js';
import { LS_KEY } from './config.js';

// создаем контекст для активации возможности загрузки визуалайзера
window.onload = function () {
  const context = new AudioContext();
  document.addEventListener('click', function () {
    context.resume().then(() => {});
  });
};

let initialList = [];

// загрузка плейлиста из локального хранилища или дефолтного списка
window.addEventListener('DOMContentLoaded', () => {
  const playlist = new PlayList();
  if (handleLocalStorage.has(LS_KEY)) {
    initialList = handleLocalStorage.load(LS_KEY);
  } else {
    initialList = PLAY_LIST_DEFAULT;
  }
  playlist.setPlaylist(initialList);
  playlist.renderList();
});

// сохранение списка в локальном хранилище перед закрытием вкладки
window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  handleLocalStorage.save(LS_KEY, initialList);
});
