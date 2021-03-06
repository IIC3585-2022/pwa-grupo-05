'use strict';

const staticDevDcc = "dev-dcc-site-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/Arenas.webp",
  "/images/Baier.webp",
  "/images/Eterovic.webp",
  "/images/Herskovic.webp",
  "/images/Lobel.webp",
  "/images/Mery.webp",
  "/images/Muñoz.webp",
  "/images/Navon.webp",
  "/images/Neyem.webp",
  "/images/Nussbaum.webp",
  "/images/Parra.webp",
  "/images/Pichara.webp",
  "/images/Reuter.webp",
  "/images/Riveros.webp",
  "/images/Ruz.webp",
  "/images/Sandoval.webp",
  "/images/Sepúlveda.webp",
  "/images/Soto.webp",
  "/images/Valdés.webp"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevDcc).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})


self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'DCC Profes';
  const options = {
    body: event.data.text(),
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);

});


self.addEventListener('notificationclick', function(event) {
console.log('[Service Worker] Notification click Received.');

event.notification.close();

});

