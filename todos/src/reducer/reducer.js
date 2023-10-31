import { ACTIONS, LS_KEY } from "../config";
import { handleLocalStorage, timeConverter } from "../utils/utils";

const initialState = {
  todoList: []
}

function getInitialState() {
  if(!handleLocalStorage.has(LS_KEY)) {
    handleLocalStorage.save(LS_KEY, initialState)
    return initialState;
  } else {
    const list = handleLocalStorage.load(LS_KEY);
    return {todoList: list};
  }
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.add: {
      const date = Date.now()
      const creationDate = timeConverter.convertToLocal(date)
      const newItem = { ...action.payload, id: date, isCompleted: false, created: creationDate };
      const updatedList = [...state.todoList].concat(newItem);
      handleLocalStorage.save(LS_KEY, updatedList)
      return {
        ...state,
        todoList: updatedList
      };
    }

    case ACTIONS.edit: {
      const {id, title, deadline, body} = action.payload;
      const ind = state.todoList.findIndex((el) => el.id === id);
      if (ind !== -1) {
        const newTodoList = [...state.todoList];
        newTodoList[ind] = {...newTodoList[ind], title, deadline, body: body || ''};
        handleLocalStorage.save(LS_KEY, newTodoList)
        
        return {
          ...state,
          todoList: newTodoList
        };
      }
      break;
    }
    case ACTIONS.delete: {
      const filteredList = state.todoList.filter((el) => el.id !== action.payload);
      handleLocalStorage.save(LS_KEY, filteredList)

      return {
        ...state,
        todoList: filteredList
      };
    }

    case ACTIONS.toggle: {
      const {id, completed} = action.payload;
      const ind = state.todoList.findIndex((el) => el.id === id);
      if (ind !== -1) {
        const newTodoList = [...state.todoList];
        newTodoList[ind].isCompleted = completed;
        handleLocalStorage.save(LS_KEY, newTodoList)

        return {
          ...state,
          todoList: newTodoList,
        };
    }
  }
}
  throw Error('Unknown action.');
}

export { getInitialState, reducer };
