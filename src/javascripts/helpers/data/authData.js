import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const authDiv = $('#auth');
const board = $('#board');
const home = $('#home');
const logout = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      board.removeClass('hide');
      home.removeClass('hide');
      logout.removeClass('hide');
      authDiv.addClass('hide');
    } else {
      board.addClass('hide');
      home.addClass('hide');
      logout.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
