import { EditItem } from 'components';
import { useState } from 'react';
import { ACTIONS } from '@/config';
import DeleteIcon from '@/assets/DeleteIcon';
import { dateToLocalDateTime } from '@/utils/utils';
import styles from './TodoItem.module.css';

export default function TodoItem({ item, handleAction }) {
  const { id, title, body, deadline, created, isCompleted } = item;
  const [completed, setCompleted] = useState(isCompleted);

  const handleComplete = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    handleAction({ type: ACTIONS.toggle, payload: { id, completed: newCompleted } });
  };

  const handleDelete = () => {
    handleAction({ type: ACTIONS.delete, payload: id });
  };

  const handleEdit = (values) => {
    handleAction({ type: ACTIONS.edit, payload: { id, ...values } });
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_main}>
        <input type="checkbox" checked={completed} className="checkbox" onChange={handleComplete} />
        <p className={completed ? styles.item_title_completed : styles.item_title}>{title}</p>
        <p className={completed ? styles.item_time_completed : styles.item_time}>{dateToLocalDateTime(deadline)}</p>
        <p className={completed ? styles.item_time_completed : styles.item_time}>{dateToLocalDateTime(created)}</p>
        <DeleteIcon className={styles.icon} handleDelete={handleDelete} />
        <EditItem handleEdit={handleEdit} title={title} body={body} deadline={deadline} />
      </div>
      <div>{body && <p className={completed ? styles.item_body_completed : styles.item_body}>{body}</p>}</div>
    </div>
  );
}
