import { ARRAY_SIZE_INPUT, DEFAULT_DELAY, DEFAULT_LENGTH } from './config.js';

function delay(ms = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

function createArray(length = 50) {
  const arr = [];

  for (let i = 1; i <= length; i++) {
    arr.push(Math.floor(Math.random() * 300));
  }
  return arr;
}

function updateText(node, text) {
  node.textContent = text;
}

function handleSortChange(state, list) {
  const sortTypeBtns = document.querySelectorAll('input[name="sortType"]');
  for (const btn of sortTypeBtns) {
    btn.addEventListener('change', (e) => {
      const value = e.target.value;
      state.dispatch('changeSort', value);
      state.dispatch('setSortingStatus', false);
      state.dispatch('setPlayPause', false);
      list.resetItemsStyle();
    });
  }
}

function updateInitialSortType(defaultV) {
  const sortTypeBtns = document.querySelectorAll('input[name="sortType"]');
  for (const btn of sortTypeBtns) {
    if (btn.value === defaultV) {
      btn.checked = true;
    }
  }
}

function sortBtnHandler() {
  const sortTypeBtns = document.querySelectorAll('input[name="sortType"]');

  return {
    updateInitial(defaultV) {
      for (const btn of sortTypeBtns) {
        if (btn.value === defaultV) {
          btn.checked = true;
        }
      }
    },
    handleChange(state, list) {
      for (const btn of sortTypeBtns) {
        btn.addEventListener('change', (e) => {
          const value = e.target.value;
          state.dispatch('changeSort', value);
          state.dispatch('setSortingStatus', false);
          state.dispatch('setPlayPause', false);
          list.resetItemsStyle();
        });
      }
    },
    disable(status) {
      for (const btn of sortTypeBtns) {
        btn.disabled = status;
      }
    },
  };
}

const handleSort = sortBtnHandler();

function validateArraySize() {
  let value = ARRAY_SIZE_INPUT.value.replace(/[^0-9]/g, '');

  if (value.length > 3) {
    value = value.slice(0, 3);
  }

  if (value > 500) {
    value = 500;
  }
  ARRAY_SIZE_INPUT.value = value;
}

function resetList(list) {
  const value = ARRAY_SIZE_INPUT.value || DEFAULT_LENGTH;
  list.setLength(value);
  list.updateListNums(value);
  list.renderList();
}

export {
  createArray,
  delay,
  handleSort,
  handleSortChange,
  resetList,
  sortBtnHandler,
  updateInitialSortType,
  updateText,
  validateArraySize,
};
