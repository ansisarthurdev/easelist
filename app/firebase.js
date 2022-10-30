import * as firebase  from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

if (!firebase.getApps().length) {
  const app = firebase.initializeApp(firebaseConfig);
  initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
}


// Initialize Firebase
export const auth = getAuth(app);
export const db = getFirestore(firebase.getApp());;