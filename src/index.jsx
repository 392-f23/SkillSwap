import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGLIpFsoLHyfRsqxW-f8dfUKa4bQV03NQ",
  authDomain: "skillswap-5f85d.firebaseapp.com",
  projectId: "skillswap-5f85d",
  storageBucket: "skillswap-5f85d.appspot.com",
  messagingSenderId: "689531219521",
  appId: "1:689531219521:web:09d21a680cfc62620860c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);