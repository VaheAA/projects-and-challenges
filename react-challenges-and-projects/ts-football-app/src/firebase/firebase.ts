
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyCk6cI0euJEOuStGWo_vXCtr-YSz0AK0Zw',

  authDomain: 'foozball-9c70f.firebaseapp.com',

  projectId: 'foozball-9c70f',

  storageBucket: 'foozball-9c70f.appspot.com',

  messagingSenderId: '640345814365',

  appId: '1:640345814365:web:06ab6d27f7a43fa9a924b4'
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);