import NumberCheckerForm from "./checkNumber.js";
import { HINT_MESSAGE } from "./constants.js";


// Логика смены уровня игры

export default class LevelSetter extends NumberCheckerForm {
  constructor(number, range, isLoaded) {
    super(number, range, isLoaded)

    this.form = document.forms.level;
    this.customFrom = this.form.elements.levelFrom;
    this.customTo = this.form.elements.levelTo;
    this.setRangeBtn = this.form.elements['level-btn'];
    this.error = document.getElementById('level-error');
    this.openBlock = document.getElementById('cutom-level');
  }

  // проверка формы - являются ли числами и не пустым вводом
  formValid() {
    const fromVal = this.customFrom.value || '';
    const toVal = this.customTo.value || '';
    const pattern = /^\d+$/;
    return pattern.test(fromVal) && pattern.test(toVal);
  };

  // обновить текст на сайте новым диапазоном
  updateSettingsUI (from, to) {
    const fromSpan = document.getElementById('l-from');
    const toSpan = document.getElementById('l-to');
    fromSpan.textContent = from;
    toSpan.textContent = to;
  }

  // слушатель на открытие настройки кастомного диапазона и на установление нового диапазона
  // проверяем валидные ли данные, если ок - обновляем в приложении диапазон или показываем ошибку
  addListeners() {
    this.openBlock.addEventListener('click', () => {
      this.form.classList.toggle('hidden');
      this.openBlock.firstElementChild.classList.toggle('open')
    })
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (this.formValid()) {
        const fromVal = +this.customFrom.value.trim();
        const toVal = +this.customTo.value.trim();
        const sortedRange = [fromVal, toVal].sort((a, b) => a - b)
        this.range = sortedRange;
        this.error.textContent = '';
        this.form.classList.toggle('hidden');
        this.updateSettingsUI(sortedRange[0], sortedRange[1]);
      } else {
        this.error.textContent = HINT_MESSAGE.rangeError;
      }
      this.gameIsLoaded = false;
      this.updateBtnStatus();
      this.form.reset();
    })
  }

  initSetter() {
    this.addListeners();
  }
}
