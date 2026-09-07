// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// 🔥 TU CONFIGURACIÓN DE FIREBASE (copia tal cual de Firebase Console)
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

// Manejar notificaciones en segundo plano (cuando la app no está abierta)
messaging.onBackgroundMessage((payload) => {
  console.log('📩 Notificación en background:', payload);
  const notificationTitle = payload.notification?.title || 'El Santísimo';
  const notificationOptions = {
    body: payload.notification?.body || 'Una nueva oración te espera',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: payload.data || {}
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});