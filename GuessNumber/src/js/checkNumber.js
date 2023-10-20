import { HINT_MESSAGE } from "./constants.js";
import { Modal } from "./modal.js";
import Counter from './counter.js';
import Number from './number.js';

// Логика проверки введенного пользователем числа
// создаем инстанс с начальными значениями числа и уровня для проверки инпута
// создаем инстанс счетчика для попыток
// создаем инстанс числа с его методами проверки

export default class NumberCheckerForm {
  constructor(number, range, gameIsLoaded) {
    this.checkerForm = document.forms.guessForm;
    this.range = range;
    this.gameIsLoaded = gameIsLoaded;
    this.guessedNum = new Number(number);
    this.counter = new Counter(0);
    this.modal = new Modal();
    this.hintOne = document.querySelector('[data-msg="1"]');
    this.hintTwo = document.querySelector('[data-msg="2"]');
    this.hintThree = document.querySelector('[data-msg="3"]');
  }

  // обновление данных чекера и обнуление формы
  setNewValues(number, range, gameIsLoaded) {
    this.guessedNum.setNumber(number);
    this.range = range;
    this.gameIsLoaded = gameIsLoaded;
    this.counter.resetCounter();
    this.updateBtnStatus();
    this.checkerForm.reset();
  }

  // проверка инпута - является ли числом и не пустым вводом
  inputValid(value) {
    const pattern = /^\d+$/;
    return value && pattern.test(value);
  };

  // получить текс сообщения об ошибке или подсказке

  getHintMessage(num) {
    const [min, max] = this.range;
    const initialNum = this.guessedNum.getNumber();

    // сообщение о победе
    if (num === initialNum) {
      return HINT_MESSAGE.equal;
    }

    // сообщение о том, что число вне границ
    if (num < min || num > max) {
      return HINT_MESSAGE.outOfRange;
    }

    // сообщение о том, число меньше или больше 
    return num < initialNum ? HINT_MESSAGE.less :  HINT_MESSAGE.greater;
  }

  getNumberTypeMsg() {
    return this.guessedNum.isEven() ? HINT_MESSAGE.even : HINT_MESSAGE.odd;
  }

  // обновить текст сообщения в дом
  updateHintMsg(node, msg) {
    node.textContent = msg;
  }
 // обновить статус кнопок - если игра не загружена (т.е. число не загадано), то кнопки не активны
  updateBtnStatus() {
    const reloadGameBtn = document.getElementById('reloadBtn');
    this.checkerForm.elements.check.disabled = !this.gameIsLoaded;

    if (this.gameIsLoaded) {
      reloadGameBtn.classList.remove('hidden');
      this.hintThree.classList.add('small_message_hidden');
    } else {
      reloadGameBtn.classList.add('hidden');
      this.hintThree.classList.remove('small_message_hidden');

    }

  }
  // показать модалку с сообщением о победе и кол-ве потраченных попыток в случе победы
  showMsgModal(msg) {
    this.modal.fillContent(msg, this.counter.count + 1);
    this.modal.toggleModal();
  }
 
  // обновить ui, при победе показываем модалку, обнуляем все данные
  // показываем четное или нечетное при каждой 3 попытке
  // на каждую попытку показываем число меньше или больше
  updateDOM(value) {

    if (!this.inputValid(value)) {
      this.updateHintMsg(this.hintOne, HINT_MESSAGE.error);
      this.updateHintMsg(this.hintTwo, '');
      return;
    }

    const message = this.getHintMessage(value);

    if (this.guessedNum.isEqual(value)) {
      this.showMsgModal(message);
      this.setNewValues(0, 1);
      this.hintOne.textContent = '';
      this.hintTwo.textContent = '';
      return;
    }
    
    if ((this.counter.count + 1) % 3 === 0) {
      this.updateHintMsg(this.hintTwo, this.getNumberTypeMsg());
    }

    this.updateHintMsg(this.hintOne, message);
    this.counter.increaseCount();
  }

  addListener() {
    this.checkerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = +e.target.guess.value.trim();
      this.updateDOM(value);
    })
  }
// инициализация чекера
  initChecker() {
    this.updateBtnStatus();
    this.addListener();
    this.modal.addListener();
  }
}
