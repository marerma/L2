function reducer(state, actionType, payload) {
  switch (actionType) {
    case 'changeSort': {
      state.sortType = payload;
      break;
    }
    case 'setSortingStatus': {
      state.isSorting = payload;
      break;
    }
  }
  return state;
}

function createStore(initialState, reducer) {
  const state = { value: initialState };

  function getState() {
    return { ...state.value };
  }

  function dispatch(action, payload) {
    const prevState = getState();
    state.value = reducer(prevState, action, payload);
  }
  return {
    getState,
    dispatch,
  };
}

export { createStore, reducer };
