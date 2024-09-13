// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDf0Y8TeAAarHg46Kk77VQWWG70UzkV4Cg",
  authDomain: "creativewrite-c9cf8.firebaseapp.com",
  projectId: "creativewrite-c9cf8",
  storageBucket: "creativewrite-c9cf8.appspot.com",
  messagingSenderId: "182302562147",
  appId: "1:182302562147:web:c6e24668f3bae1775e2556"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = app.auth();
const db = app.firestore();

export { auth, db };
