import { getInitialState, reducer } from '@/reducer/reducer';
import { sendNotification } from '@/services/notifications';
import { checkItemsToNotify } from '@/utils/utils';
import { AddItem, NotificationRequest, SortComponent, TodoItem } from 'components';
import { useEffect, useReducer } from 'react';
import { ACTIONS, CHECK_FREQUENCY } from '@/config';
import styles from './TodoList.module.css';

export default function TodoList() {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const initialSortState = state.sort;

  // запускаем интервал каждые пять минут проверяем, нужно ли уведомить о задачах.
  useEffect(() => {
    const intervalId = setInterval(() => {
      const itemsToNotify = checkItemsToNotify(state.todoList);
      sendNotification(itemsToNotify);
    }, CHECK_FREQUENCY);

    return () => {
      clearInterval(intervalId);
    };
  }, [state.todoList]);

  const handleAddItem = (values) => {
    dispatch({ type: ACTIONS.add, payload: values });
  };

  const handleSortChange = ({ type, direction }) => {
    dispatch({ type: ACTIONS.setSort, payload: { type, direction } });
  };

  return (
    <div className={styles.list_wrapper}>
      <div className={styles.list_btns}>
        <AddItem handleAdd={handleAddItem} />
        <NotificationRequest />
      </div>
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
