export default class Number {
  constructor(num) {
    this.number = num;
  }

  getNumber() {
    return this.number;
  }

  //установить новое число
  setNumber(n) {
    this.number = n;
  }
  // проверка равно ли число юзера загаданному
  isEqual(num) {
    return num === this.number;
  }

  // получение типа числа - четное или нечетное
  isEven() {
    return this.number % 2 === 0;
  }
}