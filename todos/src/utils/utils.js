import { ERRORS_MSG, SORT_DIRECTION, SORT_TYPES, TIME_OPTIONS } from '@/config';

// валидация инпутов при создании задачи - проверка на заполненность названия и дедлайна
export const validateInputs = (names, form) => {
  const newErrors = {};
  names.forEach((name) => {
    if (!form[name]) {
      newErrors[name] = ERRORS_MSG[name];
    }
  });
  return newErrors;
};

export const isValidForm = (errors) => {
  return Object.values(errors).every((el) => !el);
};

// вспомогательная функция для работы с локальным хранилищем
export const handleLocalStorage = {
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      alert('Failed to save to local storage');
    }
  },
  load(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  has(key) {
    return localStorage.getItem(key);
  },
};

// преобразование времени в удобочитаемый формат
export const dateToLocalDateTime = (dateString) => {
  const date = new Date(dateString);
  const localDateTime = date.toLocaleString(undefined, TIME_OPTIONS);
  return localDateTime;
};

// сортировка списка в зависимости от направления сортировки и типа (=поля, по которому сортировать)
export function sortList(arr, type, direction) {
  const compareFn = (a, b) => {
    if (type === SORT_TYPES.title) {
      return direction === SORT_DIRECTION.asc ? a[type].localeCompare(b[type]) : b[type].localeCompare(a[type]);
    } else {
      return direction === SORT_DIRECTION.asc
        ? new Date(a[type]) - new Date(b[type])
        : new Date(b[type]) - new Date(a[type]);
    }
  };

  return arr.sort(compareFn);
}

//проверка дел для уведомления, diff - время до наступления дедлайна, по дефолту не ранее, чем за 1ч

export function checkItemsToNotify(list, diff = 1 * 60 * 60 * 1000) {
  let currentDate = Date.now();
  const itemsToNotify = [];

  for (const item of list) {
    const { deadline, id, title, isCompleted } = item;
    let diffT = new Date(deadline) - new Date(currentDate);
    if (diffT <= diff && diffT > 0 && !isCompleted) {
      itemsToNotify.push({ id, title, message: getNotificationMessage(title, deadline) });
    }
  }
  return itemsToNotify;
}

export function getNotificationMessage(title, deadline) {
  return `Приближается дедлайн задачи ${title}. Срок истекает в ${dateToLocalDateTime(deadline)}`;
}
