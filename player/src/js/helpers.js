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

export function resetProgressBar(node) {
  node.progressBar.value = 0.00001;
  node.audio.currentTime = 0;
}
