// класс счетчика со стандартными методами: обнулить счетчик, 
// получить значение счетчика, увеличить счетчик
export default class Counter {
  constructor(count) {
    this.count = count;
    this.counterNode = document.getElementById('guess-count');
  }

  resetCounter() {
    this.count = 0;
    this.counterNode.textContent = this.count;
  }

  getCount () {
    return this.count;
  }

  increaseCount() {
    this.count++;
    this.counterNode.textContent = this.count;
  }
}