// sw.js - Service Worker de Skópia (Versión Final y Corregida)

// 1. Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalado...');
  // No hacemos nada con la caché para evitar errores
  self.skipWaiting(); // Forzamos la activación del nuevo SW
});

// 2. Activación
self.addEventListener('activate', event => {
  console.log('Service Worker: Activado...');
  // Limpiamos cachés antiguas si existieran
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
            console.log('Service Worker: Limpiando caché antiguo...', cache);
            return caches.delete(cache);
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
    event.waitUntil(clients.openWindow('/skopia.html'));
  }
});
