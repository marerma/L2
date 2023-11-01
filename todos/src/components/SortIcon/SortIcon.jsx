import { useContext } from 'react';
import { SORT_DIRECTION } from '@/config';
import { SortContext } from '../SortComponent/SortComponent';
import styles from './SortIcon.module.css';

export default function SortIcon({ handleSort, type, text }) {
  const sortType = useContext(SortContext);

  const handleChange = () => {
    const newDirection = sortType.direction === SORT_DIRECTION.asc ? SORT_DIRECTION.desc : SORT_DIRECTION.asc;
    handleSort({ type: type, direction: newDirection });
  };
  return (
    <div className={styles.icon_title}>
      <span className={sortType.type === type ? styles.icon_active : styles.icon} onClick={handleChange}>
        {text}{' '}
      </span>
      <span className={sortType.type === type ? styles.icon_active : styles.icon}>
        {sortType.type !== type ? '↑↓' : sortType.direction === SORT_DIRECTION.asc ? '↑' : '↓'}
      </span>
    </div>
  );
}
