export const LS_KEY = {
  todoList: '_todolist',
  sortType: '_sortType',
};
export const ACTIONS = {
  delete: 'deleteTodo',
  add: 'addTodo',
  toggle: 'toggleComplete',
  edit: 'editItem',
  setSort: 'setSort',
};

export const ERRORS_MSG = {
  title: 'Поле необходимо заполнить',
  deadline: 'Дедлайн необходимо заполнить',
};

export const TIME_OPTIONS = {
  hour: 'numeric',
  minute: 'numeric',
  weekday: 'short',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const SORT_DIRECTION = {
  asc: 'ascending',
  desc: 'descending',
};
export const SORT_TYPES = {
  created: 'created',
  deadline: 'deadline',
  title: 'title',
};

export const CHECK_FREQUENCY = 5 * 60 * 1000;
