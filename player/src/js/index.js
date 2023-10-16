import PLAY_LIST_DEFAULT from './playlist.js';
import { PlayList } from './PlayListClass.js';
import { changeVolume, muteGeneral } from './helpers.js';
import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js';

window.onload = function () {
  const context = new AudioContext();
  document.addEventListener('click', function () {
    context.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });
};

export const waveform = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#7F636E',
  progressColor: 'pink',
  cursorColor: '#CACAAA',
  barRadius: 3,
  height: 100,
  interact: false,
  dragToSeek: false,
});

const initialList = new PlayList(PLAY_LIST_DEFAULT);
export const APP_STATE = {
  playlist: initialList,
  isMuted: false,
  volume: 0.5,
  currentPlaying: null,
};

APP_STATE.playlist.renderList(APP_STATE);

const volumeBtn = document.querySelector('.volume-icon');
const volumeRange = document.querySelector('.volume-range');

volumeRange.addEventListener('input', () => {
  changeVolume(volumeRange, APP_STATE, volumeBtn);
});
volumeBtn.addEventListener('click', () => {
  muteGeneral(volumeBtn, volumeRange, APP_STATE);
});
