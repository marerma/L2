import { createContext, useState } from 'react';
import { SortIcon } from 'components';
import { SORT_DIRECTION, SORT_TYPES } from '@/config';
import styles from './SortComponent.module.css';

const initialSorting = { type: SORT_TYPES.created, direction: SORT_DIRECTION.asc };
export const SortContext = createContext(initialSorting);

export default function SortComponent({ handleSort, initialSorting }) {
  const [sort, setSort] = useState(initialSorting);

  const handleSortChange = ({ type, direction }) => {
    setSort({ type, direction });
    handleSort({ type, direction });
  };

  return (
    <SortContext.Provider value={sort}>
      <div className={styles.item_main}>
        <SortIcon type={SORT_TYPES.title} text={'Название'} handleSort={handleSortChange} />
        <SortIcon type={SORT_TYPES.deadline} text={'Дедлайн'} handleSort={handleSortChange} />
        <SortIcon type={SORT_TYPES.created} text={'Создано'} handleSort={handleSortChange} />
      </div>
    </SortContext.Provider>
  );
}
