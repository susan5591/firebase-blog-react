import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEstZg5rY1P3PPjlikkKj9MWVVdSBHOGE",
  authDomain: "wen-project.firebaseapp.com",
  projectId: "wen-project",
  storageBucket: "wen-project.appspot.com",
  messagingSenderId: "15651221020",
  appId: "1:15651221020:web:bfcae809c71ed183aff9d9",
  measurementId: "G-6H409XGFXR"
};

const app = initializeApp(firebaseConfig);
//for firestore
const db = getFirestore(app)
//for storage
const storage = getStorage(app)