import { useState } from 'react';
import { isValidForm, validateInputs } from '@/utils/utils';
import styles from './AddForm.module.css';

const initialFormState = { title: '', body: '', deadline: '' };
const initialErrors = { title: '', deadline: '' };

export default function AddForm({ handleForm, handleClose, initialValues = initialFormState }) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e) => {
    const name = e.target.name;
    setForm({ ...form, [name]: e.target.value });
    setErrors({ ...errors, [name]: '' });
  };

  const resetForm = () => {
    setForm(initialFormState);
    setErrors(initialErrors);
  };
  const handleAddTask = (e) => {
    e.preventDefault();
    setErrors(validateInputs(['title', 'deadline'], form));

    if (isValidForm(validateInputs(['title', 'deadline'], form))) {
      handleForm(form);
      resetForm();
      handleClose(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleAddTask}>
      <div className={styles.formItem}>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          className={styles.inputText}
          placeholder="задача (название)"
        />
        <span className={styles.error}>{errors.title}</span>
      </div>
      <div className={styles.formItem}>
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          rows={5}
          className={styles.inputText}
          placeholder="задача (описание)"
        />
      </div>
      <div className={styles.formItem}>
        <input
          type="datetime-local"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className={styles.inputText}
        />
        <span className={styles.error}>{errors.deadline}</span>
      </div>
      <div className={styles.btn_container}>
        <button type="submit" className="button_main" disabled={!isValidForm(errors)}>
          Добавить
        </button>
      </div>
    </form>
  );
}
