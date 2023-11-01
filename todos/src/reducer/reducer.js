import { ACTIONS, LS_KEY, SORT_DIRECTION, SORT_TYPES } from '@/config';
import { handleLocalStorage, sortList } from '@/utils/utils';

const initialState = {
  sort: {
    type: SORT_TYPES.created,
    direction: SORT_DIRECTION.asc,
  },
  todoList: [],
};

function getInitialState() {
  if (!handleLocalStorage.has(LS_KEY.todoList)) {
    handleLocalStorage.save(LS_KEY.todoList, initialState.todoList);
    handleLocalStorage.save(LS_KEY.sortType, initialState.sort);
    return initialState;
  } else {
    const list = handleLocalStorage.load(LS_KEY.todoList);
    const sort = handleLocalStorage.load(LS_KEY.sortType);
    return { sort, todoList: list };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.add: {
      const date = Date.now();
      const creationDate = new Date(date).toISOString();
      const newItem = { ...action.payload, id: date, isCompleted: false, created: creationDate };
      const updatedList = [...state.todoList].concat(newItem);
      handleLocalStorage.save(LS_KEY.todoList, updatedList);
      return {
        ...state,
        todoList: updatedList,
      };
    }

    case ACTIONS.edit: {
      const { id, title, deadline, body } = action.payload;
      const ind = state.todoList.findIndex((el) => el.id === id);
      if (ind !== -1) {
        const newTodoList = [...state.todoList];
        newTodoList[ind] = { ...newTodoList[ind], title, deadline, body: body || '' };
        handleLocalStorage.save(LS_KEY.todoList, newTodoList);

        return {
          ...state,
          todoList: newTodoList,
        };
      }
      break;
    }
    case ACTIONS.delete: {
      const filteredList = state.todoList.filter((el) => el.id !== action.payload);
      handleLocalStorage.save(LS_KEY.todoList, filteredList);

      return {
        ...state,
        todoList: filteredList,
      };
    }

    case ACTIONS.toggle: {
      const { id, completed } = action.payload;
      const ind = state.todoList.findIndex((el) => el.id === id);
      if (ind !== -1) {
        const newTodoList = [...state.todoList];
        newTodoList[ind].isCompleted = completed;
        handleLocalStorage.save(LS_KEY.todoList, newTodoList);

        return {
          ...state,
          todoList: newTodoList,
        };
      }
      break;
    }

    case ACTIONS.setSort: {
      const { type, direction } = action.payload;
      handleLocalStorage.save(LS_KEY.sortType, { type, direction });
      const newTodoList = [...state.todoList];
      sortList(newTodoList, type, direction);
      return {
        todoList: newTodoList,
        sort: { type, direction },
      };
    }
  }

  throw Error('Unknown action.');
}

export { getInitialState, reducer };
