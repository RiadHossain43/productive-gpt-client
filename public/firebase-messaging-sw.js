// // Scripts for firebase and firebase messaging
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
// );

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: "AIzaSyDF0WMFegLO8GKMSYcU6DIjsYugSyyXmQI",
//   authDomain: "ims-systems-00.firebaseapp.com",
//   projectId: "ims-systems-00",
//   storageBucket: "ims-systems-00.appspot.com",
//   messagingSenderId: "74093479641",
//   appId: "1:74093479641:web:de2d4584070e5fc6dbe0c8",
//   measurementId: "G-6QZY97YD2G",
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
