import { createContext, useEffect, useState } from 'react';
import { Header, TodoList, Footer, Login } from 'components';
import { handleLocalStorage } from '@/utils/utils';
import { LS_KEY } from '@/config';
import styles from './App.module.css';

export const AUTH_CONTEXT = createContext(false);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (handleLocalStorage.has(LS_KEY.token)) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AUTH_CONTEXT.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Header />
      <main className={styles.wrapper}>{isLoggedIn ? <TodoList /> : <Login />}</main>
      <Footer />
    </AUTH_CONTEXT.Provider>
  );
}

export default App;
