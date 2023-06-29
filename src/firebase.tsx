// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQxF_D6YsaENXmNrr1mxe9Jwaa8A3XjAM",
  authDomain: "web-film-57794.firebaseapp.com",
  projectId: "web-film-57794",
  storageBucket: "web-film-57794.appspot.com",
  messagingSenderId: "639567626129",
  appId: "1:639567626129:web:db9faf46f5c1814d656430",
  measurementId: "G-XL8JQ6RGSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);
export const auth = getAuth();