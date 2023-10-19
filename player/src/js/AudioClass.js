import { AUDIO } from './config.js';

export class Audio {
  static audioNode = AUDIO;
  static isPlaying = false;
  static currentPlayingId = null;
  static isMuted = false;
  static volume = 0.5;

  static setSrc(source) {
    Audio.audioNode.src = source;
  }
  static play() {
    Audio.audioNode.play();
    Audio.isPlaying = true;
  }
  static pause() {
    Audio.audioNode.pause();
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
}
