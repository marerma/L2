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
  for (let i = 1; i < array.length; i++) {
    if (!state.getState().isSorting) {
      Promise.resolve();
      return;
    }
    let j = i - 1;
    let currentHeight = array[i].height;
    array[i].setActive();
    if (!state.getState().isSorting) {
      Promise.resolve();
      return;
    }
    while (j >= 0 && array[j].height > currentHeight) {
      array[j].setActive();
      array[j].setAccent(true);
      array[j + 1].setHeight(array[j].height);

      await delay();
      array[j].resetActive();
      j--;
    }
    array[j + 1].setHeight(currentHeight);
    array[i].resetActive();
  }
  array.at(-1).setAccent(true);
  Promise.resolve();
}

async function partition(items, left, right) {
  const pivot = items[Math.floor((right + left) / 2)];

  pivot.setActive();
  let i = left;
  let j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      items[i].setActive();
      items[j].setActive();
      swap(items, i, j);
      i++;
      j--;
      await delay();
      items[i].resetActive();
      items[j].resetActive();
    }
  }
  return i;
}
async function quickSort(items, left, right) {
  let index;
  if (items.length > 1) {
    index = await partition(items, left, right);
    if (left < index - 1) {
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      await quickSort(items, index, right);
    }
  }
}
async function quickSortFn(array, state) {
  await quickSort(array, 0, array.length - 1);
}

const sortArrayFn = {
  [SORT_TYPE.bubble]: bubbleSort,
  [SORT_TYPE.select]: selectSort,
  [SORT_TYPE.insertion]: insertionSort,
  [SORT_TYPE.merge]: bubbleSort,
  [SORT_TYPE.quick]: quickSortFn,
};

export { bubbleSort, sortArrayFn };
