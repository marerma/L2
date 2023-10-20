const BLOCK = document.getElementById('block');
const START_BTN = document.querySelector("button[name='start']");
const DEFAULT_LENGTH = 10;
const DEFAULT_DELAY = 150;

const SORT_TYPE = {
  bubble: 'bubble',
  select: 'select',
  insertion: 'insertion',
  merge: 'merge',
  quick: 'quick',
};

const SORT_BTN_TEXT = {
  start: 'Начать сортировку',
  stop: 'Остановить сортировку',
};
export {
  BLOCK,
  SORT_BTN_TEXT,
  SORT_TYPE,
  START_BTN,
  DEFAULT_DELAY,
  DEFAULT_LENGTH,
};
