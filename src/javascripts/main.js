import firebase from 'firebase';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import myNavbar from './components/MyNavbar/MyNavbar';
import apiKeys from './helpers/apiKeys';
import home from './components/home/home';
import '../styles/main.scss';
import board from './components/boards/boards';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavbar.logoutEvent();
  home.homeMaker();
  board.makeABoard();
};

init();
