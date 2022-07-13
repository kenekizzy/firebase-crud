import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyC7UOKiJbOgNGgM8ljdBRim1Kgv1n14CUw",
    authDomain: "react-crud-46d98.firebaseapp.com",
    projectId: "react-crud-46d98",
    storageBucket: "react-crud-46d98.appspot.com",
    messagingSenderId: "710490387090",
    appId: "1:710490387090:web:4eb6ce06dc59b24a142c4b"
  };

  const fireDb = firebase.initializeApp(firebaseConfig)
  export default fireDb.database().ref()