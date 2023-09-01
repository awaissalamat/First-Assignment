// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO50ydLZfvqSoaFtd9ATQyYYJyuQ9J0qo",
  authDomain: "todo-assign-82c61.firebaseapp.com",
  projectId: "todo-assign-82c61",
  storageBucket: "todo-assign-82c61.appspot.com",
  messagingSenderId: "1003066350917",
  appId: "1:1003066350917:web:41f6adae2ab97375f1b22c",
  measurementId: "G-LPVP59YX0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {analytics,firestore,auth}