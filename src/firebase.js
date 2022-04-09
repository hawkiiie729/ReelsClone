// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjlFkfCsMWpIIxkYDRmHJme98G21YerCM",
  authDomain: "reels-7849b.firebaseapp.com",
  projectId: "reels-7849b",
  storageBucket: "reels-7849b.appspot.com",
  messagingSenderId: "1034788174837",
  appId: "1:1034788174837:web:838fa3aac7037676733ebc"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig); 

 export const auth= firebase.auth();


 const firestore=firebase.firestore();
 export const database={
   users:firestore.collection('users'),
   getTimeStamp:firebase.firestore.FieldValue.serverTimestamp, //taki latest post phle aaye ..timestamp k base pe sort kiya
 }

 export const storage=firebase.storage()