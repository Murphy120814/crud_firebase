// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "crud-operation-a9e45.firebaseapp.com",
  projectId: "crud-operation-a9e45",
  storageBucket: "crud-operation-a9e45.appspot.com",
  messagingSenderId: "501508203609",
  appId: "1:501508203609:web:8c5fcdc9f3e840797a7d48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
