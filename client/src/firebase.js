// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-estate-31068.firebaseapp.com",
  projectId: "mern-estate-31068",
  storageBucket: "mern-estate-31068.firebasestorage.app",
  messagingSenderId: "332294045538",
  appId: "1:332294045538:web:2186df07f3c76d29f4763b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);