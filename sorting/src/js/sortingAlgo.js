import { SORT_TYPE } from './config.js';
import { delay } from './helpers.js';

function swap(items, leftIndex, rightIndex) {
  const temp = items[leftIndex].height;
  items[leftIndex].setHeight(items[rightIndex].height);
  items[rightIndex].setHeight(temp);
}

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

async function selectSort(array, state) {
  let n = array.length;

  for (let i = 0; i < n; i++) {
    if (!state.getState().isSorting) {
      Promise.resolve();
      return;
    }

    let min = i;
    array[min].setAccent(true);
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
      array[min].setAccent();
    }
  }
  Promise.resolve();
}

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

async function partition(items, low, high, state) {
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
  // if (!state.getState().isSorting) {
  //   Promise.resolve();
  //   return;
  // }
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

const sortArrayFn = {
  [SORT_TYPE.bubble]: bubbleSort,
  [SORT_TYPE.select]: selectSort,
  [SORT_TYPE.insertion]: insertionSort,
  [SORT_TYPE.merge]: bubbleSort,
  [SORT_TYPE.quick]: quickSortFn,
};

export { bubbleSort, sortArrayFn };
