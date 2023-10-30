import { AudioVisualizer } from './AudioVisualizer.js';
import { AUDIO_TRACK_PROGRESS } from './config.js';

// базовый класс аудио с методами плей, пауза, изменения громкости
// с встроенным визуалайзером
export class Audio {
  static visualizer = new AudioVisualizer();

  static audioNode = Audio.visualizer.waveform.media;
  static isPlaying = false;
  static currentPlayingId = null;
  static isMuted = false;
  static volume = 0.5;

  static play() {
    Audio.visualizer.play();
    Audio.isPlaying = true;
  }
  static pause() {
    Audio.visualizer.pause();
    Audio.isPlaying = false;
  }

  static mute() {
    Audio.isMuted = true;
    Audio.audioNode.muted = true;
  }
  static unmute() {
    Audio.isMuted = false;
    Audio.audioNode.muted = false;
    Audio.audioNode.volume = Audio.volume;
  }
  static changeVolume(v) {
    Audio.volume = v;
    Audio.audioNode.volume = v;
  }

  static handlePlayPause(audioElement) {
    if (Audio.isPlaying) {
      audioElement.pause();
      Audio.pause();
    } else {
      audioElement.play();
      Audio.play();
      Audio.visualizer.updateProgressTrack(AUDIO_TRACK_PROGRESS.value);
    }
  }
}
