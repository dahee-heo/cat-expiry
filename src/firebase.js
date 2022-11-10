import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from '@firebase/firestore';
import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: '',
//   authDomain: '',
//   databaseURL: '',
//   projectId: '',
//   storageBucket: '',
//   messagingSenderId: '',
//   appId: '',
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};


// firebase.initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app)