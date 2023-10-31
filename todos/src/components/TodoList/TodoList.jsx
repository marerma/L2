import { AddItem, TodoItem } from 'components';
import { useReducer } from 'react';
import { getInitialState, reducer } from '../../reducer/reducer';
import styles from './TodoList.module.css';
import { ACTIONS } from '../../config';


export default function TodoList() {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const handleAddItem = (values) => {
    dispatch({type: ACTIONS.add, payload: values})
  }

  return (
    <div className={styles.list_wrapper}>
      <AddItem handleAdd={handleAddItem}/>
      <div className={styles.list}>
        {state.todoList.length > 0 ? 
          <>
          <h2>Список дел</h2>
          <div className={styles.list_wrapper}>
          <div className={styles.item}>
            <div className={styles.item_main}>
              <p className={styles.item_title}>Название</p>
              <p className={styles.item_time}>Дедлайн <span>↓</span></p>
              <p className={styles.item_time}>Создано <span>↑</span></p>
            </div>
    </div>

           {state.todoList.map(item => (<TodoItem key={item.id} handleAction={dispatch} item ={item}/>))}
          </div>
          </>
          :
          <p>Список задач пока пуст...</p>
        }
      </div>
    </div>
  )
}
