import { SORT_TYPE } from './config.js';
import { delay } from './helpers.js';

// функция для обмена высотой между элементами
function swap(items, leftIndex, rightIndex) {
  const temp = items[leftIndex].height;
  items[leftIndex].setHeight(items[rightIndex].height);
  items[rightIndex].setHeight(temp);
}

// сортировка пузырьком
async function bubbleSort(array, state) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      let el1 = array[j];
      let el2 = array[j + 1];
      el1.setActive();
      el2.setActive();
      if (el1.height > el2.height) {
        swap(array, j, j + 1);
      }

      // если сортровка на паузе, то ожиать пока состояние не изменится на страт
      while (state.getState().isPaused) {
        await delay();
      }
      await delay();
      el1.resetActive();
      el2.resetActive();

      if (!state.getState().isSorting) {
        Promise.resolve();
        return;
      }
    }
    array[array.length - 1 - i].setAccent(true);
  }
  Promise.resolve();
}

// сортировка выбором
async function selectSort(array, state) {
  let n = array.length;

  for (let i = 0; i < n; i++) {
    if (!state.getState().isSorting) {
      Promise.resolve();
      return;
    }

    let min = i;
    for (let j = i; j < n; j++) {
      if (!state.getState().isSorting) {
        Promise.resolve();
        return;
      }
      array[j].setActive();
      if (array[j].height < array[min].height) {
        await delay();
        min = j;
      }
      while (state.getState().isPaused) {
        await delay();
      }
      await delay();
      array[j].resetActive();
    }

    if (min != i) {
      swap(array, i, min);
      await delay();
      array[i].setAccent(true);
    } else {
      array[min].setAccent(true);
    }
  }
  Promise.resolve();
}

// сорировка вставками
async function insertionSort(array, state) {
  array[0].setAccent(true);

  for (let i = 1; i < array.length; i++) {
    if (!state.getState().isSorting) {
      Promise.resolve();
      return;
    }

    let j = i - 1;
    let currentHeight = array[i].height;
    array[i].setActive();

    while (j >= 0 && array[j].height > currentHeight) {
      if (!state.getState().isSorting) {
        Promise.resolve();
        return;
      }
      while (state.getState().isPaused) {
        await delay();
      }
      array[j].setActive();
      array[j + 1].setHeight(array[j].height);

      await delay();
      array[j].resetActive();
      j--;
    }
    array[j + 1].setHeight(currentHeight);
    array[i].setAccent(true);
    array[i].resetActive();
  }
  Promise.resolve();
}

// быстрая сортировка
// функция для разделения массива
async function partition(items, low, high) {
  let pivot = items[high];
  pivot.setActive();

  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (items[j].height <= pivot.height) {
      i++;
      items[i].setActive();
      swap(items, i, j);
      await delay();
      items[i].resetActive();
      items[i].setAccent(true);
    }
  }

  items[i + 1].setActive();
  swap(items, i + 1, high);
  await delay();
  items[i + 1].resetActive();
  items[i + 1].setAccent(true);

  pivot.resetActive();
  return i + 1;
}
async function quickSort(items, left, right, state) {
  if (left < right) {
    let pi = await partition(items, left, right, state);

    while (state.getState().isPaused) {
      await delay();
    }

    await quickSort(items, left, pi - 1, state);
    await quickSort(items, pi + 1, right, state);
    items.at(-1).setAccent(true);
  }
}
async function quickSortFn(array, state) {
  await quickSort(array, 0, array.length - 1, state);
}

async function merge(array, low, mid, high, state) {
  const lengthL = mid - low + 1;
  const lengthR = high - mid;
  let left = new Array(lengthL);
  let right = new Array(lengthR);

  while (state.getState().isPaused) {
    await delay();
  }

  for (let i = 0; i < lengthL; i++) {
    array[low + i].setActive();
    left[i] = array[low + i].height;
    await delay();

    array[low + i].resetActive();
  }
  for (let i = 0; i < lengthR; i++) {
    array[mid + 1 + i].setActive();
    right[i] = array[mid + 1 + i].height;
    await delay();
    array[mid + 1 + i].resetActive();
  }

  await delay();
  let i = 0,
    j = 0,
    k = low;

  while (i < lengthL && j < lengthR) {
    if (parseInt(left[i]) <= parseInt(right[j])) {
      if (lengthL + lengthR === array.length) {
        array[k].setAccent(true);
      } else {
        array[k].setAccent(true);
      }

      while (state.getState().isPaused) {
        await delay();
      }

      array[k].setHeight(left[i]);
      i++;
      k++;
    } else {
      if (lengthL + lengthR === array.length) {
        array[k].setAccent(true);
      } else {
        array[k].setAccent(true);
      }
      array[k].setHeight(right[j]);
      j++;
      k++;
    }
  }

  while (i < lengthL) {
    await delay();
    if (lengthL + lengthR === array.length) {
      array[k].setAccent(true);
    } else {
      array[k].setAccent(true);
    }
    while (state.getState().isPaused) {
      await delay();
    }
    array[k].setHeight(left[i]);
    i++;
    k++;
  }
  while (j < lengthR) {
    await delay();

    if (lengthL + lengthR === array.length) {
      array[k].setAccent(true);
    } else {
      array[k].setAccent(true);
    }
    while (state.getState().isPaused) {
      await delay();
    }
    array[k].setHeight(right[j]);
    j++;
    k++;
  }
}

async function mergeSort(array, l, r, state) {
  if (l >= r) {
    return;
  }
  const m = l + Math.floor((r - l) / 2);
  while (state.getState().isPaused) {
    await delay();
  }
  await mergeSort(array, l, m, state);
  await mergeSort(array, m + 1, r, state);
  while (state.getState().isPaused) {
    await delay();
  }
  await merge(array, l, m, r, state);
}

async function mergeSortFn(array, state) {
  await mergeSort(array, 0, array.length - 1, state);
}

// вспомогательный "словарь" для быстрого определения нужной функции
const sortArrayFn = {
  [SORT_TYPE.bubble]: bubbleSort,
  [SORT_TYPE.select]: selectSort,
  [SORT_TYPE.insertion]: insertionSort,
  [SORT_TYPE.quick]: quickSortFn,
  [SORT_TYPE.merge]: mergeSortFn,
};

export { sortArrayFn };
