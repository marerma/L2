import { TEMPLATE_AUDIO, PLAYLIST } from './config.js';
import { audioControl, resetProgressBar, updateUITimer } from './helpers.js';
import { APP_STATE, waveform } from './index.js';

export class PlayItem {
  constructor({ src, title, id }) {
    this.src = src;
    this.title = title;
    this.id = id;
    this.node = TEMPLATE_AUDIO.content.cloneNode(true);
    this.audio = new Audio(this.src);
    this.audio.muted = false;
    this.audio.volume = 0.5;
    this.titleEl = this.node.querySelector('.item__title');
    this.titleEl.textContent = this.title;
    this.node.append(this.audio);
    this.playBtn = this.node.querySelector('.playIcon');
    this.progressBar = this.node.querySelector('.track');
    this.currentTime = this.node.querySelector('.current__time');
    this.trackTime = this.node.querySelector('.track__time');
    this.addControls();
    this.isPlaying = false;
  }

  play() {
    this.audio.play();
    waveform.play();
    this.playBtn.classList.add('active');
    this.isPlaying = true;
    APP_STATE.currentPlaying = this.id;
  }
  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.playBtn.classList.remove('active');
    waveform.pause();
  }

  mute() {
    this.audio.muted = true;
  }
  unmute() {
    this.audio.muted = false;
  }
  changeVolume(v) {
    this.audio.volume = v;
  }
  getItem() {
    return this.node;
  }
  addControls() {
    this.playBtn.addEventListener('click', () => {
      waveform.load(this.src).then(() => {
        if (!this.isPlaying) {
          if (APP_STATE.currentPlaying !== this.id) {
            APP_STATE.playlist.updateCurrentPlaying(APP_STATE.currentPlaying);
          }
          APP_STATE.playlist.stopAll();
          APP_STATE.playlist.playing = true;
          this.play();
        } else {
          this.pause();
        }
      });
    });

    this.audio.addEventListener('loadedmetadata', () => this.progressUpdate());

    this.audio.addEventListener('timeupdate', () => this.progressUpdate());
    this.progressBar.addEventListener('click', (e) => {
      audioControl(this, this.progressBar, e);
      waveform.seekTo(this.progressBar.value / 100);
    });
  }
  progressUpdate() {
    let duration = this.audio.duration;
    let current = this.audio.currentTime;
    if (isNaN((current / duration) * 100)) {
      this.progressBar.value = 0.0001;
    } else {
      this.progressBar.value = (current / duration) * 100;
    }

    if (this.progressBar.value == 100) {
      this.pause();
      this.progressBar.value = 0.0001;
      this.audio.currentTime = 0;
    }
    updateUITimer(this.currentTime, this.trackTime, duration, current);
  }
}

export class PlayList {
  constructor(playlist) {
    this.playlist = playlist;
    this.playing = false;
    this.audioList = this.createList(this.playlist);
  }

  addItem(item) {
    this.playlist.push(item);
    this.audioList.push(new PlayItem(item));
  }

  getLength() {
    return this.playlist.length;
  }

  createList(list) {
    return list.map((el) => new PlayItem(el));
  }

  renderList() {
    PLAYLIST.innerHtml = '';
    this.audioList.forEach((element) => {
      PLAYLIST.append(element.getItem());
    });
  }

  stopAll() {
    if (this.playing) {
      this.audioList.forEach((song) => {
        song.pause();
        song.isPlaying = false;
        song.playBtn.classList.remove('active');
      });
      this.playing = false;
    }
  }
  changeVolumeAll(state) {
    if (state.isMuted) {
      this.audioList.forEach((song) => {
        song.mute();
      });
    } else {
      this.audioList.forEach((song) => {
        song.unmute();
        song.changeVolume(state.volume);
      });
    }
  }

  updateCurrentPlaying(id) {
    this.audioList
      .filter((el) => el.id === id)
      .forEach((song) => {
        resetProgressBar(song);
      });
  }
}
