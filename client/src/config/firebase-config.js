import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDgZIS4pa3o8NqQjWDtW-lSlL6pfl260WI",
  authDomain: "kicks-33990.firebaseapp.com",
  projectId: "kicks-33990",
  storageBucket: "kicks-33990.appspot.com",
  messagingSenderId: "881356141183",
  appId: "1:881356141183:web:4a42de754ef44b0a4d454a",
  measurementId: "G-LMF233YHNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const storage = getStorage(app);