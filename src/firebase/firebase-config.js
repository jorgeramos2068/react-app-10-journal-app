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

const firebaseConfigTesting = {
  apiKey: "AIzaSyA1OKs-nQHeMIT_8e4LTeQPgzvgcqjRPp8",
  authDomain: "react-journal-app-jramos-test.firebaseapp.com",
  databaseURL: "https://react-journal-app-jramos-test.firebaseio.com",
  projectId: "react-journal-app-jramos-test",
  storageBucket: "react-journal-app-jramos-test.appspot.com",
  messagingSenderId: "901109002421",
  appId: "1:901109002421:web:fcaa8468695a2e8f128efc"
};

if (process.env.NODE_ENV === 'test') {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfigTesting);
}
else {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

// Reference to the DB
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}
