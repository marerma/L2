import { TEMPLATE_AUDIO } from './config.js';

// компонент аудио - интерфейс с кнопками и стилями
export class PlayItem {
  constructor({ src, title, id }) {
    this.src = src;
    this.title = title;
    this.id = id;
    this.node = TEMPLATE_AUDIO.content.cloneNode(true);
    this.titleEl = this.node.querySelector('.item__title');
    this.titleEl.textContent = this.title;
    this.playBtn = this.node.querySelector('.playIcon');
    this.repeatBtn = this.node.querySelector('.repeat-icon');
  }

  play() {
    this.playBtn.classList.add('active');
    this.titleEl.classList.add('title__animation');
  }
  pause() {
    this.playBtn.classList.remove('active');
  }

  toggleRepeat(id) {
    if (id === this.id) {
      this.repeatBtn.classList.add('repeat-icon_selected');
    } else this.repeatBtn.classList.remove('repeat-icon_selected');
  }

  getItem() {
    return this.node;
  }
}
