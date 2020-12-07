import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAX0j2GWTGx0a5YEv7vvWJ6HW37mKYhby4",
  authDomain: "hobbybuddy-19263.firebaseapp.com",
  databaseURL: "https://hobbybuddy-19263-default-rtdb.firebaseio.com",
  projectId: "hobbybuddy-19263",
  storageBucket: "hobbybuddy-19263.appspot.com",
  messagingSenderId: "38214122155",
  appId: "1:38214122155:web:f5dc96270f3a8ef3d215ee",
  measurementId: "G-Q4H8FS6TQX"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
