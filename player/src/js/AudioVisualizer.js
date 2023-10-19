import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js';

export class AudioVisualizer {
  constructor() {
    this.waveform = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#7F636E',
      progressColor: 'pink',
      cursorColor: '#CACAAA',
      barRadius: 3,
      height: 100,
      interact: false,
      dragToSeek: false,
    });
  }

  load(src, callback) {
    this.waveform.load(src).then(callback);
  }

  play() {
    this.waveform.play();
  }

  pause() {
    this.waveform.pause();
  }

  updateProgressTrack(value) {
    this.waveform.seekTo(value / 100);
  }
}
