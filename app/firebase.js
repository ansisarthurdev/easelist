import  firebase  from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {API_KEY} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "easelist-8a162.firebaseapp.com",
  projectId: "easelist-8a162",
  storageBucket: "easelist-8a162.appspot.com",
  messagingSenderId: "828110534878",
  appId: "1:828110534878:web:7a29abc583823c5e176a4f",
  measurementId: "G-WJ5SBT0315"
};

let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}


// Initialize Firebase
export const auth = firebase.auth();
export const db = app.firestore();