import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './app.scss';

const firebaseConfig = {
  apiKey: "AIzaSyBlqUWYRXAROcZ7yqPOF4IfdbLbxyTYn8A",
  authDomain: "chainbreaker-app.firebaseapp.com",
  databaseURL: "https://chainbreaker-app.firebaseio.com",
  projectId: "chainbreaker-app",
  storageBucket: "chainbreaker-app.appspot.com",
  messagingSenderId: "669251220885",
  appId: "1:669251220885:web:c1a315d651d94fa122329c",
  measurementId: "G-Z7RGZP3ZB7"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
