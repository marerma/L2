const BLOCK = document.getElementById('block');
const START_BTN = document.querySelector("button[name='start']");
const CREATE_NEW = document.querySelector("button[name='createNew']");
const ARRAY_SIZE_INPUT = document.getElementById('arraySize');
const DEFAULT_LENGTH = 15;
const DEFAULT_DELAY = 150;

const SORT_TYPE = {
  bubble: 'bubble',
  select: 'select',
  insertion: 'insertion',
  merge: 'merge',
  quick: 'quick',
};

const DEFAULT_SORT = SORT_TYPE.bubble;

const SORT_BTN_TEXT = {
  start: 'Старт',
  stop: 'Пауза',
};

export {
  BLOCK,
  SORT_BTN_TEXT,
  SORT_TYPE,
  START_BTN,
  DEFAULT_DELAY,
  DEFAULT_LENGTH,
  CREATE_NEW,
  ARRAY_SIZE_INPUT,
  DEFAULT_SORT,
};
