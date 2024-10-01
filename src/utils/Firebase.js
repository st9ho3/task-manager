import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-ubNkqLGgVy2Va5KgNBSAikNFclaUpW8",
  authDomain: "the-notes-app-cfe0c.firebaseapp.com",
  projectId: "the-notes-app-cfe0c",
  storageBucket: "the-notes-app-cfe0c.appspot.com",
  messagingSenderId: "352919141780",
  appId: "1:352919141780:web:2ad4ca6348b40264bce381"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
