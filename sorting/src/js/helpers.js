import { ARRAY_SIZE_INPUT, DEFAULT_DELAY, DEFAULT_LENGTH } from './config.js';

// функция для задержки при смене стилей колонок
function delay(ms = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

// создание нового массива
function createArray(length = DEFAULT_LENGTH) {
  const arr = [];

  for (let i = 1; i <= length; i++) {
    arr.push(Math.floor(Math.random() * 300));
  }
  return arr;
}

function updateText(node, text) {
  node.textContent = text;
}

// хэндлер сортировки: обновление изначального типа, слушатель на смену типа сотрировки
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

// валидация размера массива, в данной реализации ограничено 500 элементами
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

// изменение статуса инпутов и кнопок
function setDisabledBtns(value) {
  if (value) {
    ARRAY_SIZE_INPUT.setAttribute('readonly', true);
  } else {
    ARRAY_SIZE_INPUT.removeAttribute('readonly');
  }
  handleSort.disable(value);
}

export {
  createArray,
  delay,
  handleSort,
  sortBtnHandler,
  updateText,
  validateArraySize,
  setDisabledBtns,
};
