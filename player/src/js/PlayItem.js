import { TEMPLATE_AUDIO } from './config.js';

export class PlayItem {
  constructor({ src, title, id }) {
    this.src = src;
    this.title = title;
    this.id = id;
    this.node = TEMPLATE_AUDIO.content.cloneNode(true);
    this.titleEl = this.node.querySelector('.item__title');
    this.titleEl.textContent = this.title;
    this.playBtn = this.node.querySelector('.playIcon');
  }

  play() {
    this.playBtn.classList.add('active');
    this.titleEl.classList.add('title__animation');
  }
  pause() {
    this.playBtn.classList.remove('active');
  }

  getItem() {
    return this.node;
  }
}
