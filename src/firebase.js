import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
/**
 * TODO: Add SDKs for Firebase products that you want to use
 * https://firebase.google.com/docs/web/setup#available-libraries
 *
 * Your web app's Firebase configuration
 * For Firebase JS SDK v7.20.0 and later, measurementId is optional
 */
const firebaseConfig = {
  apiKey: "AIzaSyDF0WMFegLO8GKMSYcU6DIjsYugSyyXmQI",
  authDomain: "ims-systems-00.firebaseapp.com",
  projectId: "ims-systems-00",
  storageBucket: "ims-systems-00.appspot.com",
  messagingSenderId: "74093479641",
  appId: "1:74093479641:web:de2d4584070e5fc6dbe0c8",
  measurementId: "G-6QZY97YD2G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getClientToken = (handleTokenFound = () => {}) => {
  return getToken(messaging, {
    vapidKey: "BOX_2xP0TFswsrwFTeePYpswKgoy8fgwhetS-90twanARSRd0HoIFolMXqQjvWVyPQdKjkTlGcKgCBecfNzsS9Q",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        handleTokenFound(currentToken);
        /**
         * Track the token -> client mapping, by sending to backend server
         * show on the UI that permission is secured
         */
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        handleTokenFound(null);
        /**
         * shows on the UI that permission is required
         */
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
