// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore/lite";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Look into this tomorrow 
const firebaseConfig = {
  apiKey: "AIzaSyDWQRQkZJm2Vb60Ib2gb2IdhRrvhEYMDag",
  authDomain: "individual-assignment-jsx.firebaseapp.com",
  projectId: "individual-assignment-jsx",
  storageBucket: "individual-assignment-jsx.appspot.com",
  messagingSenderId: "291090795071",
  appId: "1:291090795071:web:3f6af545fff31bd3c6868a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);

export {db}