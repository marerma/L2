import { Audio } from './AudioClass.js';
import { AudioVisualizer } from './AudioVisualizer.js';
import { PlayItem } from './PlayItem.js';
import {
  PLAYLIST,
  VOLUME_BTN,
  VOL_RANGE_BTN,
  AUDIO_TRACK_PROGRESS,
  AUDIO_CURRENT_TIME,
  AUDIO_TRACK_TIME,
  PLAYLIST_PLAY_BTN,
  PLAYLIST_SHUFFLE_BTN,
} from './config.js';
import { handleProgressClick, progressUpdate } from './helpers.js';

export class PlayList extends Audio {
  constructor(playlist) {
    super();
    this.playlist = playlist;
    this.audioList = this.createList(this.playlist);
    this.visualizer = new AudioVisualizer();
  }

  createPlayItem({ src, title, id }) {
    const element = new PlayItem({ src, title, id });
    element.playBtn.addEventListener('click', () => {
      this.controlPlaying(element);
    });
    element.titleEl.addEventListener('click', () => {
      this.controlPlaying(element);
    });
    return element;
  }

  addItem(item) {
    this.playlist.push(item);
    this.audioList.push(this.createPlayItem(item));
  }

  createList(list) {
    return list.map((el) => this.createPlayItem(el));
  }

  controlPlaying(audioElement) {
    this.visualizer.load(audioElement.src, () => {
      if (Audio.currentPlayingId !== audioElement.id) {
        this.stopAll();
        Audio.setSrc(audioElement.src);
        Audio.currentPlayingId = audioElement.id;
      }
      if (Audio.isPlaying) {
        audioElement.pause();
        Audio.pause();
        this.visualizer.pause();
      } else {
        audioElement.play();
        Audio.play();
        this.visualizer.play();
      }
    });
  }

  stopAll() {
    this.audioList.forEach((song) => {
      Audio.pause();
      song.pause();
      song.titleEl.classList.remove('title__animation');
    });
    Audio.isPlaying = false;
  }

  mute(resetVol, unSetVol) {
    if (Audio.isMuted) {
      Audio.unmute();
      resetVol(Audio.volume);
    } else {
      Audio.mute();
      unSetVol();
    }
  }

  setVolume(volume) {
    if (volume === 0) {
      Audio.mute();
      Audio.volume = 0;
    } else {
      Audio.unmute();
      Audio.changeVolume(volume);
    }
  }

  addVolumeHandlers() {
    VOL_RANGE_BTN.addEventListener('input', (e) => {
      const value = parseInt(e.target.value, 10);
      this.setVolume(value / 100);
      if (value === 0) {
        VOLUME_BTN.classList.add('volume-icon-mute');
      } else {
        VOLUME_BTN.classList.remove('volume-icon-mute');
      }
    });

    VOLUME_BTN.addEventListener('click', () => {
      VOLUME_BTN.classList.toggle('volume-icon-mute');
      this.mute(
        (v) => {
          VOL_RANGE_BTN.value = v * 100;
        },
        () => {
          VOL_RANGE_BTN.value = 0;
        }
      );

      // muteGeneral(VOL_RANGE_BTN, initialList);
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

    Audio.audioNode.addEventListener('timeupdate', () =>
      progressUpdate(
        Audio.audioNode,
        AUDIO_TRACK_PROGRESS,
        AUDIO_CURRENT_TIME,
        AUDIO_TRACK_TIME
      )
    );

    AUDIO_TRACK_PROGRESS.addEventListener('click', (e) => {
      handleProgressClick(Audio.audioNode, AUDIO_TRACK_PROGRESS, e);
      this.visualizer.updateProgressTrack(AUDIO_TRACK_PROGRESS.value);
    });
  }

  addPlaylistControlHandles() {
    PLAYLIST_PLAY_BTN.addEventListener('click', () => {
      console.log('clich')
      this.playListDirect();
    });
  }
  renderList() {
    PLAYLIST.innerHtml = '';
    this.audioList.forEach((element) => {
      PLAYLIST.append(element.getItem());
    });
    this.addVolumeHandlers();
    this.addProgressBarHandlers();
    this.addPlaylistControlHandles();
  }

  playListDirect() {
    let i = 0;
    // while (i < this.audioList.length) {
    //   this.visualizer.load(this.audioList[i].src, () => {
    //     Audio.setSrc(this.audioList[i].src);
    //     Audio.currentPlayingId = this.audioList[i].src.id;
    //     this.audioList[i].play();
    //     Audio.play();
    //     this.visualizer.play();
    //     Audio.audioNode.addEventListener('ended', () => {
    //       console.log('ended');
    //       i++;
    //     });
    //   });
    // }
  }
}
