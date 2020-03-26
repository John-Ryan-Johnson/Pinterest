import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import authData from './helpers/data/authData';
import auth from './components/Auth/auth';
import myNavbar from './components/MyNavbar/MyNavbar';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavbar.logoutEvent();
};

init();
