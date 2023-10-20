import { DEFAULT_DELAY } from "./config.js";

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

function handleSortChange(state) {
  const sortTypeBtns = document.querySelectorAll('input[name="sortType"]');
  for (const btn of sortTypeBtns) {
    btn.addEventListener("change", (e) => {
      const value = e.target.value;
      state.dispatch("changeSort", value);
    });
  }
}
export { delay, createArray, updateText, handleSortChange };
