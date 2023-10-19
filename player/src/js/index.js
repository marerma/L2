import { PlayList } from './PlayListClass.js';
import PLAY_LIST_DEFAULT from './playlist.js';

window.onload = function () {
  const context = new AudioContext();
  document.addEventListener('click', function () {
    context.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });
};

const initialList = new PlayList(PLAY_LIST_DEFAULT);
initialList.renderList();
