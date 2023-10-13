export const DEFAULT_LEVEL = [1, 100];
export const DEFAULT_NUM = () => Math.floor(Math.random() * (DEFAULT_LEVEL[1] - DEFAULT_LEVEL[0] + 1) + DEFAULT_LEVEL[0])

export const HINT_MESSAGE = {
  less: 'Число меньше загаданного',
  greater: 'Число больше загаданного',
  equal: 'Вы угадали число!',
  odd: 'Число нечетное',
  even:'Число четное',
  error: 'Введите целое число!',
  outOfRange: 'Введенное число не входит в загаданный диапазон',
  rangeError: 'Введите диапазон с целыми числами'
}