// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkGgGOYSFJ4X8zrEWXLQpiHlX3gwoY1m8",
  authDomain: "user-email-password-d5ebd.firebaseapp.com",
  projectId: "user-email-password-d5ebd",
  storageBucket: "user-email-password-d5ebd.appspot.com",
  messagingSenderId: "844216880368",
  appId: "1:844216880368:web:03a33afbbb40d967c10635"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth; 