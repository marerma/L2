import { useContext } from 'react';
import { AUTH_CONTEXT } from '@/App';
import { logOutRequest } from '@/services/authorization';

import styles from './Header.module.css';

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AUTH_CONTEXT);

  const handleLogout = async () => {
    await logOutRequest();
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      <h1>Приложение для контроля задач и времени</h1>
      {isLoggedIn && (
        <div className={styles.header_btn}>
          <button type="button" className="button_main" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}
