import { useReducer } from 'react';
import { getInitialState, reducer } from '@/reducer/reducer';
import { AddItem, TodoItem, SortComponent } from 'components';
import { ACTIONS } from '@/config';
import styles from './TodoList.module.css';

export default function TodoList() {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const initialSortState = state.sort;

  const handleAddItem = (values) => {
    dispatch({ type: ACTIONS.add, payload: values });
  };

  const handleSortChange = ({ type, direction }) => {
    dispatch({ type: ACTIONS.setSort, payload: { type, direction } });
  };

  return (
    <div className={styles.list_wrapper}>
      <AddItem handleAdd={handleAddItem} />
      <div className={styles.list}>
        {state.todoList.length > 0 ? (
          <>
            <h2>Список дел</h2>
            <div className={styles.list_wrapper}>
              <div className={styles.item}>
                <SortComponent handleSort={handleSortChange} initialSorting={initialSortState} />
              </div>
              {state.todoList.map((item) => (
                <TodoItem key={item.id} handleAction={dispatch} item={item} />
              ))}
            </div>
          </>
        ) : (
          <p>Список задач пока пуст...</p>
        )}
      </div>
    </div>
  );
}
