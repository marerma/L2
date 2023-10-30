import { BLOCK, ARRAY_SIZE_INPUT, DEFAULT_LENGTH } from './config.js';
import { createArray } from './helpers.js';

// Элемент-колонка, имеет высоту, по которой идет сортировка
export class ListItem {
  constructor(height) {
    this.node = document.createElement('div');
    this.height = height;
    this.id = Date.now();
  }

  setHeight(h) {
    this.height = h;
    this.node.style.height = h + 'px';
  }

  createNode() {
    this.node.classList.add('column__item');
    this.node.style.height = this.height + 'px';
    BLOCK.append(this.node);
  }

  setActive() {
    this.node.classList.add('column__item_active');
  }

  resetActive() {
    this.node.classList.remove('column__item_active');
  }

  setAccent(flag) {
    if (flag) {
      this.node.classList.add('accent');
    } else this.node.classList.remove('accent');
  }
}

// Список элементов-колонок с методами управления
class List {
  constructor(length) {
    this.listNums = [];
    this.nodesList = [];
    this.length = length;
  }

  getListNums() {
    return this.listNums;
  }

  setLength(n) {
    this.length = n;
  }

  createList() {
    this.listNums = createArray(this.length);
    this.updateNodeList();
  }

  updateNodeList() {
    this.nodesList = this.listNums.map((element) => new ListItem(element));
  }

  renderList() {
    BLOCK.innerHTML = '';
    BLOCK.style.gridTemplateColumns = `repeat(${this.length}, 1fr)`;
    this.nodesList.forEach((element) => element.createNode());
  }

  resetItemsStyle() {
    this.nodesList.forEach((item) => {
      item.setAccent();
      item.resetActive();
    });
  }

  resetList() {
    const value = ARRAY_SIZE_INPUT.value || DEFAULT_LENGTH;
    this.setLength(value);
    this.createList();
    this.renderList();
  }
}

export { List };
