import { List } from './components.js';
import {
  ARRAY_SIZE_INPUT,
  CREATE_NEW,
  DEFAULT_DELAY,
  DEFAULT_LENGTH,
  SORT_BTN_TEXT,
  START_BTN,
  RESET_BTN,
  DEFAULT_SORT,
} from './config.js';
import {
  handleSortChange,
  updateText,
  validateArraySize,
  resetList,
  handleSort,
} from './helpers.js';
import { sortArrayFn } from './sortingAlgo.js';
import { createStore, reducer } from './store.js';

const initialState = {
  delay: DEFAULT_DELAY,
  sortType: DEFAULT_SORT,
  isSorting: false,
  isPaused: false,
};

ARRAY_SIZE_INPUT.value = DEFAULT_LENGTH;
handleSort.updateInitial(DEFAULT_SORT);

const STATE = createStore(initialState, reducer);

const list = new List(DEFAULT_LENGTH);
list.renderList();

function handleStartSorting(state, list) {
  const { sortType } = state.getState();

  state.dispatch('setSortingStatus', true);
  state.dispatch('setPlayPause', false);
  list.resetItemsStyle();
  updateText(START_BTN, SORT_BTN_TEXT.stop);

  sortArrayFn[sortType](list.nodesList, state).then(() => {
    state.dispatch('setSortingStatus', false);
    state.dispatch('setPlayPause', false);
    updateText(START_BTN, SORT_BTN_TEXT.start);
    handleSort.disable(false);
  });
}

RESET_BTN.addEventListener('click', () => {
  STATE.dispatch('setSortingStatus', false);
  STATE.dispatch('setPlayPause', false);
  resetList(list);

  handleStartSorting(STATE, list);
});

START_BTN.addEventListener('click', () => {
  const { isSorting, isPaused } = STATE.getState();

  if (!isSorting) {
    handleStartSorting(STATE, list);
    handleSort.disable(true);
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

ARRAY_SIZE_INPUT.oninput = validateArraySize;
ARRAY_SIZE_INPUT.onchange = function () {
  validateArraySize();
  STATE.dispatch('setSortingStatus', false);
  STATE.dispatch('setPlayPause', false);
  resetList(list);
};

CREATE_NEW.addEventListener('click', () => {
  resetList(list);
});

handleSortChange(STATE, list);
