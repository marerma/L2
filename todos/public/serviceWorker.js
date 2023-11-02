self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  const { items } = event.data;

  for (let item of items) {
    const { id, title, message } = item;
    self.registration.showNotification(title, {
      body: message,
      tag: id,
    });
  }
});
