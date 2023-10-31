import { ERRORS_MSG } from '../config';


export const validateInputs = (names, form) => {
  const newErrors = {};
  names.forEach(name => {
    if(!form[name]) {
      newErrors[name] = ERRORS_MSG[name];
    }
  })
  return newErrors;
}

export const isValidForm = (errors) => {
  return Object.values(errors).every(el => !el)
}


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

export const timeConverter = {
  convertToLocal(timestamp) {
    const date = new Date(timestamp);
    const localDateTime = date.toLocaleString();
    return localDateTime;
  },
  dateToLocalDateTime(dateString) {
    const date = new Date(dateString);
    console.log(dateString)
    const localDateTime = date.toLocaleString();
    return localDateTime;
}
}