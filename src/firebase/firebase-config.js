import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzoPtdJrciK2Ajt9WXeSSnBKR4I21Acjk",
  authDomain: "react-journal-app-jramos.firebaseapp.com",
  databaseURL: "https://react-journal-app-jramos.firebaseio.com",
  projectId: "react-journal-app-jramos",
  storageBucket: "react-journal-app-jramos.appspot.com",
  messagingSenderId: "1096150811017",
  appId: "1:1096150811017:web:e5fc20dd62af99aab9e158"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the DB
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}
