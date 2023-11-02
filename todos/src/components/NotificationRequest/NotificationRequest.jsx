import { useEffect } from 'react';
import { registerServiceWorker, requestPermission } from '@/services/notifications';
import styles from './NotificationRequest.module.css';

export default function NotificationRequest() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <div className={styles.btn_container}>
      <button type="button" className={'button_main'} onClick={requestPermission}>
        {Notification.permission === 'granted'
          ? 'Уведомления о дедлайнах разрешены'
          : 'Разрешить уведомления о дедлайнах'}
      </button>
    </div>
  );
}
