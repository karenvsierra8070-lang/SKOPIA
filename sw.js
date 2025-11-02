// sw.js - Service Worker de Skópia

const CACHE_NAME = 'skopia-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/skopia.html',
  '/errores.html',
  '/notificaciones.html',
  '/logo.jpeg',
  '/panda.jpeg',
  '/global-settings.js'
];

// 1. Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalado...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 2. Activación y limpieza de cachés antiguos
self.addEventListener('activate', event => {
  console.log('Service Worker: Activado...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Limpiando caché antiguo...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. ¡LA PARTE MÁS IMPORTANTE! Escuchar mensajes "push"
self.addEventListener('push', event => {
  console.log('Service Worker: Push recibido...');
  const options = {
    body: event.data ? event.data.text() : 'Skópia tiene un nuevo mensaje para ti.',
    icon: 'logo.jpeg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'explore', title: 'Ir a Skópia' },
      { action: 'close', title: 'Cerrar' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('¡Mensaje de Skópia!', options)
  );
});

// 4. Manejar clics en las notificaciones
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notificación clickeada...');
  event.notification.close();

  if (event.action === 'explore') {
    // Abre la página principal de Skópia cuando se hace clic en "Ir a Skópia"
    event.waitUntil(clients.openWindow('/skopia.html'));
  }
});