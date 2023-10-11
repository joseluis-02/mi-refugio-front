// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyA0sMqT5CE-7E_k0llEwnxVQXjsqMDENB8",
  authDomain: "mi-refugio-login.firebaseapp.com",
  projectId: "mi-refugio-login",
  storageBucket: "mi-refugio-login.appspot.com",
  messagingSenderId: "104526534372",
  appId: "1:104526534372:web:dc8e163a3c0ca42c773ef1"
};*/
const firebaseConfig = {
  apiKey: "AIzaSyDnIlUJJF6bVCMfZWDYp3LChHYDJZ6cTxs",
  authDomain: "mi-refugio-front.firebaseapp.com",
  projectId: "mi-refugio-front",
  storageBucket: "mi-refugio-front.appspot.com",
  messagingSenderId: "1060169621364",
  appId: "1:1060169621364:web:43318ed04d3f5a2e40d621",
  //measurementId: "G-7NK1YQM7FC"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);