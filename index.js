//import firebase from "firebase/compat/app";
const provider = new GoogleAuthProvider();
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
   getAuth,
   createUserWithEmailAndPassword ,
   signInWithEmailAndPassword,
   onAuthStateChanged  ,
   updateProfile,
   signOut,
   signInWithPopup,
   GoogleAuthProvider
     } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
//
const firebaseConfig = {//
  apiKey: "AIzaSyC5FCzhbeocXFQTy3a7T8OOoT3Ya7QKy3s",
  authDomain: "poly-dex.firebaseapp.com",
  projectId: "poly-dex",
  storageBucket: "poly-dex.firebasestorage.app",
  messagingSenderId: "45959209468",
  appId: "1:45959209468:web:cfccfd8da291634bf19279",
  measurementId: "G-3D703KN4PE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;//

//variables
const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");


