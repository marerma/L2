import { List } from './components.js';
import {
  DEFAULT_DELAY,
  DEFAULT_LENGTH,
  SORT_BTN_TEXT,
  SORT_TYPE,
  START_BTN,
} from './config.js';
import { handleSortChange, updateText } from './helpers.js';
import { sortArrayFn } from './sortingAlgo.js';
import { createStore, reducer } from './store.js';

const initialState = {
  delay: DEFAULT_DELAY,
  sortType: SORT_TYPE.bubble,
  isSorting: false,
  initialList: [],
};

const STATE = createStore(initialState, reducer);

const list = new List(DEFAULT_LENGTH);
list.renderList();

START_BTN.addEventListener('click', () => {
  const { isSorting, sortType } = STATE.getState();
  if (isSorting) {
    updateText(START_BTN, SORT_BTN_TEXT.start);
    STATE.dispatch('setSortingStatus', false);
  } else {
    updateText(START_BTN, SORT_BTN_TEXT.stop);
    STATE.dispatch('setSortingStatus', true);
    list.resetItemsStyle();
    sortArrayFn[sortType](list.nodesList, STATE).then(() => {
      STATE.dispatch('setSortingStatus', false);
      updateText(START_BTN, SORT_BTN_TEXT.start);
    });
  }
});

handleSortChange(STATE);
