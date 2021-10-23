import { initializeApp } from 'firebase/app';
import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/storage'
// Optionally import the services that you want to use
//import { auth } from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAxpQaNg0JZ4npnET6S37vwMh5jVa_pGWU",

  authDomain: "talktime-57277.firebaseapp.com",

  projectId: "talktime-57277",

  storageBucket: "talktime-57277.appspot.com",

  messagingSenderId: "997851941694",

  appId: "1:997851941694:web:e1cce12d58c3c154fcba6f",

  measurementId: "G-WP0DDHJYWE"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth()
export { auth };

const storage = firebase.storage()
export { storage };