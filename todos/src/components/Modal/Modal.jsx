import { useRef, useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ handleClose, children }) {
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handleClose(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [handleClose]);

  return (
    <div className={styles.modal_wrapper}>
      <div className={styles.modal_content} ref={ref}>
        <p className={styles.close_icon} onClick={() => handleClose(false)}>
          {' '}
          х закрыть
        </p>
        {children}
      </div>
    </div>
  );
}
