// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBbRxOI3RC6ErIsIVyWXc3MtLqKe_AJ3k8",
  authDomain: "el-santisimo-notificaciones.firebaseapp.com",
  projectId: "el-santisimo-notificaciones",
  storageBucket: "el-santisimo-notificaciones.firebasestorage.app",
  messagingSenderId: "231660133924",
  appId: "1:231660133924:web:0e0e7cb3c8695c89c702b1"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Manejar notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('📩 Notificación en background:', payload);
  
  // Extraer datos
  const notificationTitle = payload.notification?.title || 'El Santísimo';
  const notificationBody = payload.notification?.body || 'Una nueva oración te espera';
  const icon = '/icon-192.png';
  const clickUrl = payload.data?.url || '/';

  // Mostrar la notificación manualmente
  self.registration.showNotification(notificationTitle, {
    body: notificationBody,
    icon: icon,
    badge: icon,
    data: { url: clickUrl },
    actions: [
      { action: 'open', title: 'Ver oración' }
    ]
  });
});

// Manejar clic en la notificación
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/';
  event.waitUntil(
    clients.openWindow(urlToOpen)
  );
});