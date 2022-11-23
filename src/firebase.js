import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCf7WeANU62p1sFAphNDVwvy-3zjqNgCl8",
  authDomain: "clone-45588.firebaseapp.com",
  projectId: "clone-45588",
  storageBucket: "clone-45588.appspot.com",
  messagingSenderId: "598615890465",
  appId: "1:598615890465:web:5e9140d05fac6c90ce2160",
  measurementId: "G-PKM1HZE1ZQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db , auth};