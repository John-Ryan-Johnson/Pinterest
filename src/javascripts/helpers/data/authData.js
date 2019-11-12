import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const authDiv = $('#auth');
const board = $('#board');
const home = $('#home');
const logout = $('#navbar-button-logout');
const back = $('#back');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      board.removeClass('hide');
      home.removeClass('hide');
      logout.removeClass('hide');
      back.removeClass('hide');
      authDiv.addClass('hide');
    } else {
      board.addClass('hide');
      home.addClass('hide');
      logout.addClass('hide');
      back.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
