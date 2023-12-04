import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAPNDS6ozCBUghJFMvlsX56V2ex1RBgfk0",
  authDomain: "cmpeproj-5ef4a.firebaseapp.com",
  projectId: "cmpeproj-5ef4a",
  storageBucket: "cmpeproj-5ef4a.appspot.com",
  messagingSenderId: "677633205633",
  appId: "1:677633205633:web:e3743f5dbada239ccc7480",
  measurementId: "G-ZGG6ML9BKW"
};

const app = initializeApp(firebaseConfig);

export const database = getAuth(app)

