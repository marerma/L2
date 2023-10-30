import { Audio } from './AudioClass.js';
import { PlayItem } from './PlayItem.js';
import {
  AUDIO_CURRENT_TIME,
  AUDIO_INPUT,
  AUDIO_TRACK_PROGRESS,
  AUDIO_TRACK_TIME,
  PLAYLIST,
  PLAYLIST_PLAY_BTN,
  PLAYLIST_SHUFFLE_BTN,
  PLAYLIST_SORT,
  VOLUME_BTN,
  VOL_RANGE_BTN,
  LS_KEY,
} from './config.js';
import {
  handleProgressClick,
  progressUpdate,
  resetPlaylistModeBtn,
  resetRepeatBtn,
  toggleVolumeBtn,
  updateVolumeRange,
  handleLocalStorage,
} from './helpers.js';

// плейлист с методами управления - проигрывание в двух типах (по порядку, в случайном порядке)
export class PlayList extends Audio {
  constructor() {
    super();
    this.playlist = [];
    this.audioList = [];
    this.playingMode = PLAYLIST_SORT.direct;
    this.playingList = false;
    this.playingIndex = 0;
    this.loop = { on: false, id: null };
  }

  setPlaylist(playlist) {
    this.playlist = playlist;
    this.audioList = this.createList(playlist);
  }

  createPlayItem({ src, title, id }) {
    const element = new PlayItem({ src, title, id });
    element.playBtn.addEventListener('click', () => {
      resetRepeatBtn();
      this.loop.id = null;
      this.loop.on = false;
      this.controlPlaying(element);
    });
    element.titleEl.addEventListener('click', () => {
      resetRepeatBtn();
      this.loop.id = null;
      this.loop.on = false;
      this.controlPlaying(element);
    });
    element.repeatBtn.addEventListener('click', () => {
      this.setRepeating(element);
    });
    return element;
  }

  addItem(item) {
    this.playlist.push(item);
    const newItem = this.createPlayItem(item);
    this.audioList.push(newItem);
    PLAYLIST.append(newItem.getItem());
    handleLocalStorage.save(LS_KEY, this.playPlaylist);
  }

  createList(list) {
    return list.map((el) => this.createPlayItem(el));
  }

  // генерация индекса следующего трека в зависимости от типа проигрывания
  generateNextIndex() {
    switch (this.playingMode) {
      case PLAYLIST_SORT.direct:
        this.playingIndex =
          this.playingIndex + 1 === this.audioList.length
            ? 0
            : this.playingIndex + 1;
        break;
      case PLAYLIST_SORT.shuffle:
        this.playingIndex = Math.floor(Math.random() * this.audioList.length);
        break;

      default:
        this.playingIndex = 0;
    }
  }

  controlPlaying(audioElement) {
    if (this.playingList) {
      this.playingIndex = this.audioList.findIndex(
        (el) => el.id === audioElement.id
      );
      this.generateNextIndex();
    }

    if (Audio.currentPlayingId !== audioElement.id) {
      this.stopAll();
      Audio.currentPlayingId = audioElement.id;

      Audio.visualizer.load(audioElement.src, () => {
        Audio.handlePlayPause(audioElement);
      });
    } else {
      Audio.handlePlayPause(audioElement);
    }
  }

  setRepeating(item) {
    resetRepeatBtn();
    if (this.loop.on && this.loop.id === item.id) {
      this.loop.id = null;
      this.loop.on = false;
    } else {
      this.loop.id = item.id;
      this.loop.on = true;
    }
    item.toggleRepeat(this.loop.id);
  }

  stopAll() {
    Audio.pause();
    Audio.isPlaying = false;
    this.audioList.forEach((song) => {
      song.pause();
      song.titleEl.classList.remove('title__animation');
    });
  }

  changePlaylistMode(mode, el) {
    this.stopAll();
    this.playingMode = mode;
    this.playingIndex = 0;
    this.playingList = false;
    resetPlaylistModeBtn();
    if (el) {
      if (mode !== PLAYLIST_SORT.direct) {
        this.generateNextIndex();
      }

      if (!this.playingList) {
        this.playingList = true;
        this.playPlaylist();
        el.classList.add('active-playlist');
      }
    }
  }

  playPlaylist() {
    Audio.visualizer.load(this.audioList[this.playingIndex].src, () => {
      console.log(this.playingIndex)
      Audio.currentPlayingId = this.audioList[this.playingIndex].id;
      this.audioList[this.playingIndex].play();
      Audio.play();
      this.generateNextIndex();
    });
  }

  mute() {
    if (Audio.isMuted) {
      Audio.unmute();
      updateVolumeRange(Audio.volume);
    } else {
      Audio.mute();
      updateVolumeRange();
    }
  }

  setVolume(volume) {
    Audio.changeVolume(volume);
  }

  addVolumeHandlers() {
    VOL_RANGE_BTN.addEventListener('input', (e) => {
      const value = e.target.value / 100;
      toggleVolumeBtn(value);
      this.setVolume(value);
    });

    VOLUME_BTN.addEventListener('click', () => {
      VOLUME_BTN.classList.toggle('volume-icon-mute');
      this.mute();
    });
  }

  addProgressBarHandlers() {
    Audio.audioNode.addEventListener('loadedmetadata', () =>
      progressUpdate(
        Audio.audioNode,
        AUDIO_TRACK_PROGRESS,
        AUDIO_CURRENT_TIME,
        AUDIO_TRACK_TIME
      )
    );
    Audio.visualizer.waveform.on('finish', () => {
      if (this.loop.on && Audio.currentPlayingId === this.loop.id) {
        Audio.play();
      } else if (this.playingList) {
        this.stopAll();
        this.playPlaylist();
      } else {
        Audio.audioNode.currenTime = 0;
      }
    });

    Audio.visualizer.waveform.on('timeupdate', () => {
      progressUpdate(
        Audio.audioNode,
        AUDIO_TRACK_PROGRESS,
        AUDIO_CURRENT_TIME,
        AUDIO_TRACK_TIME
      );
    });

    AUDIO_TRACK_PROGRESS.addEventListener('click', (e) => {
      handleProgressClick(Audio.audioNode, AUDIO_TRACK_PROGRESS, e);
      Audio.visualizer.updateProgressTrack(AUDIO_TRACK_PROGRESS.value);
    });
  }

  addPlaylistControlHandles() {
    PLAYLIST_PLAY_BTN.addEventListener('click', () => {
      this.changePlaylistMode(PLAYLIST_SORT.direct, PLAYLIST_PLAY_BTN);
    });

    PLAYLIST_SHUFFLE_BTN.addEventListener('click', () => {
      this.changePlaylistMode(PLAYLIST_SORT.shuffle, PLAYLIST_SHUFFLE_BTN);
    });
  }

  addSaveHandler() {
    AUDIO_INPUT.addEventListener('change', (e) => {
      const file = e.target.files[0];

      const newFile = {
        id: Date.now(),
        title: '',
        src: '',
      };
      if (file) {
        newFile.title = file.name.split('.')[0];
        const reader = new FileReader();
        reader.onload = function (e) {
          const audioData = e.target.result;
          newFile.src = audioData;
        };
        reader.readAsDataURL(file);

        this.addItem(newFile);
      }
    });
  }

  renderList() {
    PLAYLIST.innerHtml = '';
    this.createList(this.playlist);
    this.audioList.forEach((element) => {
      PLAYLIST.append(element.getItem());
    });

    this.addVolumeHandlers();
    this.addProgressBarHandlers();
    this.addPlaylistControlHandles();
    this.addSaveHandler();
  }
}
