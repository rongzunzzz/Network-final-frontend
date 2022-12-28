// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqIfkeq9m0f3mZYlLewn6VjPrrpp71qnE",
  authDomain: "react-auth-af905.firebaseapp.com",
  projectId: "react-auth-af905",
  storageBucket: "react-auth-af905.appspot.com",
  messagingSenderId: "743393450602",
  appId: "1:743393450602:web:91f98649f4920c31ae8813"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provide = GoogleAuthProvider();