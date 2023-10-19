import {
  PLAYLIST_SHUFFLE_BTN,
  PLAYLIST_PLAY_BTN,
  VOLUME_BTN,
  VOL_RANGE_BTN,
} from './config.js';
export function updateUITimer(
  currentTrackTimeEl,
  trackTime,
  duration,
  currentT
) {
  let currentTime = new Date(currentT * 1000);
  trackTime.textContent = formatTime(duration);
  let currentSec = currentTime.getSeconds().toString().padStart(2, '0');
  currentTrackTimeEl.textContent = `${currentTime.getMinutes()}:${currentSec}`;
}

export function formatTime(duration) {
  const trackDuration = new Date(duration * 1000);
  return duration
    ? `${trackDuration.getMinutes()}:${trackDuration.getSeconds()}`
    : '00:00';
}

export function handleProgressClick(audio, progressBar, event) {
  let width = progressBar.offsetWidth;
  let pointer = event.offsetX;
  progressBar.value = (pointer / width) * 100;
  audio.currentTime = audio.duration * (pointer / width);
}

export function progressUpdate(audio, progressBar, currentTEl, trackTEl) {
  let duration = audio.duration;
  let current = audio.currentTime;

  if (isNaN((current / duration) * 100)) {
    progressBar.value = 0.0001;
  } else {
    progressBar.value = (current / duration) * 100;
  }

  if (progressBar.value == 100) {
    audio.pause();
    progressBar.value = 0.0001;
    audio.currentTime = 0;
  }
  updateUITimer(currentTEl, trackTEl, duration, current);
}

export const handleLocalStorage = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  load(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  has(key) {
    return localStorage.getItem(key);
  },
};

export function blobToBase64(blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}

export function resetPlaylistModeBtn() {
  PLAYLIST_PLAY_BTN.classList.remove('active-playlist');
  PLAYLIST_SHUFFLE_BTN.classList.remove('active-playlist');
}

export function resetRepeatBtn() {
  const allRepeat = document.querySelectorAll('.repeat-icon');
  for (const node of allRepeat) {
    node.classList.remove('repeat-icon_selected');
  }
}

export function toggleVolumeBtn(value) {
  if (value === 0) {
    VOLUME_BTN.classList.add('volume-icon-mute');
  } else {
    VOLUME_BTN.classList.remove('volume-icon-mute');
  }
}

export const updateVolumeRange = (v = 0) => {
  VOL_RANGE_BTN.value = v * 100;
};
