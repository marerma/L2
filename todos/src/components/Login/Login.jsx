import { useContext, useState } from 'react';
import { handleLocalStorage } from '@/utils/utils';
import { LS_KEY } from '@/config';
import { AUTH_CONTEXT } from '@/App';
import { makeAuthRequest } from '@/services/authorization';
import styles from './Login.module.css';

export default function Login() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState('');
  const { setIsLoggedIn } = useContext(AUTH_CONTEXT);

  const handleChange = (e) => {
    setName(e.target.value);
    setErrors('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const reg = /[a-zA-Z]{5,10}/;
    if (reg.test(name)) {
      const accessToken = await makeAuthRequest(name);
      handleLocalStorage.save(LS_KEY.token, accessToken);
      setIsLoggedIn(true);
    } else {
      setErrors('Никнейм должен содержать от 5 до 10 латинских букв');
    }
  };
  return (
    <form id="login" className={styles.form} onSubmit={handleLogin}>
      Введите данные, чтобы войти
      <div className={styles.formItem}>
        <input
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
          className={styles.inputText}
          placeholder="никнейм"
        />
        <span className={styles.error}>{errors}</span>
      </div>
      <div className={styles.btn_container}>
        <button type="submit" className="button_main" disabled={errors}>
          Войти
        </button>
      </div>
    </form>
  );
}
