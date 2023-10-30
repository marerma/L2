import { List } from './components.js';
import {
  ARRAY_SIZE_INPUT,
  CREATE_NEW,
  DEFAULT_DELAY,
  DEFAULT_LENGTH,
  DEFAULT_SORT,
  SORT_BTN_TEXT,
  START_BTN,
} from './config.js';
import {
  handleSort,
  setDisabledBtns,
  updateText,
  validateArraySize,
} from './helpers.js';
import { sortArrayFn } from './sortingAlgo.js';
import { createStore, reducer } from './store.js';

// обновляем интерфейс при загрузке
ARRAY_SIZE_INPUT.value = DEFAULT_LENGTH;
handleSort.updateInitial(DEFAULT_SORT);

// инициализируем стейт
const initialState = {
  delay: DEFAULT_DELAY,
  sortType: DEFAULT_SORT,
  isSorting: false,
  isPaused: false,
};

const STATE = createStore(initialState, reducer);

// создаем массив чисел и отрисовываем колонки
const list = new List(DEFAULT_LENGTH);
list.createList();
list.renderList();

// добавляем слушатели на тип сортировки
handleSort.handleChange(STATE, list);

// функция для старта/паузы сотрировки
function handleStartSorting(state, list) {
  const { sortType } = state.getState();

  state.dispatch('setSortingStatus', true);
  state.dispatch('setPlayPause', false);
  list.resetItemsStyle();
  updateText(START_BTN, SORT_BTN_TEXT.stop);
  setDisabledBtns(true);

  sortArrayFn[sortType](list.nodesList, state).then(() => {
    state.dispatch('setSortingStatus', false);
    state.dispatch('setPlayPause', false);
    updateText(START_BTN, SORT_BTN_TEXT.start);
    setDisabledBtns(false);
  });
}

START_BTN.addEventListener('click', () => {
  const { isSorting, isPaused } = STATE.getState();

  if (!isSorting) {
    handleStartSorting(STATE, list);
  } else {
    if (isPaused) {
      updateText(START_BTN, SORT_BTN_TEXT.stop);
      STATE.dispatch('setPlayPause', false);
    } else {
      updateText(START_BTN, SORT_BTN_TEXT.start);
      STATE.dispatch('setPlayPause', true);
    }
  }
});

// слушатель изменения размера массива
ARRAY_SIZE_INPUT.oninput = validateArraySize;
ARRAY_SIZE_INPUT.onchange = function () {
  validateArraySize();
  STATE.dispatch('setSortingStatus', false);
  STATE.dispatch('setPlayPause', false);
  list.resetList();
};

// создание нового массива (="перезагрузка")
CREATE_NEW.addEventListener('click', () => {
  STATE.dispatch('setSortingStatus', false);
  STATE.dispatch('setPlayPause', false);
  updateText(START_BTN, SORT_BTN_TEXT.start);
  list.resetList();
  setDisabledBtns(false);
});
