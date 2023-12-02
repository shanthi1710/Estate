// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-ad156.firebaseapp.com",
  projectId: "estate-ad156",
  storageBucket: "estate-ad156.appspot.com",
  messagingSenderId: "990382978633",
  appId: "1:990382978633:web:6dbfa19e3827838406f198"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

