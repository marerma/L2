export function updateUITimer(
  currentTrackTimeEl,
  trackTime,
  duration,
  currentT
) {
  const trackDuration = new Date(duration * 1000);
  let currentTime = new Date(currentT * 1000);
  trackTime.textContent = `${trackDuration.getMinutes()}:${trackDuration.getSeconds()}`;
  let currentSec = currentTime.getSeconds().toString().padStart(2, '0');
  currentTrackTimeEl.textContent = `${currentTime.getMinutes()}:${currentSec}`;
}

export function formatTime(duration) {
  const trackDuration = new Date(duration * 1000);
  return `${trackDuration.getMinutes()}:${trackDuration.getSeconds()}`;
}
export function audioControl(node, progressBar, event) {
  let width = progressBar.offsetWidth;
  let pointer = event.offsetX;
  progressBar.value = (pointer / width) * 100;
  node.audio.currentTime = node.audio.duration * (pointer / width);

  if (node.isPlaying) {
    node.play();
  }
}

export function resetProgressBar(node) {
  node.progressBar.value = 0.00001;
  node.audio.currentTime = 0;
}

export function mute(volumeBtn, volumeRange, state) {
  volumeBtn.classList.add('volume-icon-mute');
  state.isMuted = true;
  state.playlist.changeVolumeAll(state);
  volumeRange.value = 0;
}

export function unmute(volumeBtn, volumeRange, state) {
  volumeBtn.classList.remove('volume-icon-mute');
  state.isMuted = false;
  state.playlist.changeVolumeAll(state);
  volumeRange.value = 50;
}

export function muteGeneral(volumeBtn, volumeRange, state) {
  if (!state.isMuted) {
    mute(volumeBtn, volumeRange, state);
  } else {
    unmute(volumeBtn, volumeRange, state);
  }
}

export function changeVolume(volumeRange, state, volumeBtn) {
  let v = volumeRange.value;
  state.volume = v / 100;
  if (state.volume === 0) {
    mute(volumeBtn, volumeRange, state);
  } else {
    volumeBtn.classList.remove('volume-icon-mute');
    state.isMuted = false;
  }
  state.playlist.changeVolumeAll(state);
}
