import { Header, TodoList } from 'components'
import styles from './App.module.css';
import { Footer } from './components';




function App() {
  return (
    <>
    <Header />
    <main className={styles.wrapper}>
      <TodoList />
    </main>
    <Footer />
    </>
  )
}

export default App
