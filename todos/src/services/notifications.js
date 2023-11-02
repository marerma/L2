// регистрация сервис-воркера
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./serviceWorker.js');
      console.log('Service Worker registered with scope:', registration.scope);
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }
}

// запрос разрешения на уведомления
export async function requestPermission() {
  try {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission !== 'denied') {
      await Notification.requestPermission();
    }
  } catch (err) {
    console.log(err);
  }
}

async function getRegistration() {
  return navigator.serviceWorker.getRegistration();
}

// отправка сообщения сервис-воркеру с делами, о которых необходимо уведомить
export async function sendNotification(itemsToNotify) {
  if (itemsToNotify.length) {
    let registration = await getRegistration();

    if (registration) {
      registration.active.postMessage({ items: itemsToNotify });
    } else {
      console.log('No service worker registration found.');
    }
  }
}
