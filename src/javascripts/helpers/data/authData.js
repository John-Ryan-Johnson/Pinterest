import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const homeDiv = $('#home');
const authDiv = $('#auth');
const boardsDiv = $('#board');
const logoutNavbar = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      logoutNavbar.removeClass('hide');
      boardsDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      authDiv.addClass('hide');
    } else {
      logoutNavbar.addClass('hide');
      boardsDiv.addClass('hide');
      homeDiv.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
