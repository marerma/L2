import { Header, TodoList, Footer } from 'components';
import styles from './App.module.css';

function App() {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <TodoList />
      </main>
      <Footer />
    </>
  );
}

export default App;
