// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ0aV1WyiYEYY8OU7YlIAL6T1GxFgYLZg",
  authDomain: "courier-tracking-f48b1.firebaseapp.com",
  databaseURL: "https://courier-tracking-f48b1-default-rtdb.firebaseio.com",
  projectId: "courier-tracking-f48b1",
  storageBucket: "courier-tracking-f48b1.appspot.com",
  messagingSenderId: "525250641077",
  appId: "1:525250641077:web:39c04ae879a4a36cfd52fc",
  measurementId: "G-MS0GB18GQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it
const database = getDatabase(app);

export { database };
