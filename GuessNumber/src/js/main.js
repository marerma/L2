import NumberCheckerForm from "./checkNumber.js";
import LevelSetter from "./level.js";
import { DEFAULT_LEVEL, DEFAULT_NUM } from "./constants.js";

const initialNum = DEFAULT_NUM();


class App extends LevelSetter {
  constructor() {
    super(initialNum, DEFAULT_LEVEL, false);
    this.number = initialNum;
    this.initGameBtn = document.getElementById('guessNumber');
    this.reloadGameBtn = document.getElementById('reloadBtn');
  }
  
  // инициализируем число в границах загаданного уровня
  initNumber() {
    const [min, max] = this.range;
    this.number = Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  // загадать число, обновить форму отгадывания и показать кнопку перезагрузки игры
  guessNum() {
    this.initNumber();
    this.gameIsLoaded = true;
    this.setNewValues(this.number, this.range, this.gameIsLoaded);
  }

  // перезагрузка игры - обнуление счетчика и загадываение нового числа, 
  // уроень остаетсяпоследним установленным
  // новая игра запустится без перезагрузки страниц
  reloadGame() {
    this.initNumber();
    this.setNewValues(this.number, this.range, this.gameIsLoaded);
  }

  // инициализируем инстанс игры, запускаем логику изменения настроек и проверки числа, 
  // а  также слушатели кнопок перезагрузки и начала игры
  initGame() {
    this.initChecker();
    this.initSetter(this.range);

    this.initGameBtn.addEventListener('click', () => {
      this.guessNum();
    });

    this.reloadGameBtn.addEventListener('click', () => {
      this.reloadGame();
    })
  }
}

// загружаем игру при загрузке страницы с дефолтным числом в диапазоне [0 - 100]
const NewGame = new App();
NewGame.initGame();


