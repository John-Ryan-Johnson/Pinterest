import firebase from 'firebase/app';
import $ from 'jquery';

const authDiv = $('#auth');
const logoutButton = $('#navbar-button-logout');
const home = $('#home');


const logoutEvent = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        authDiv.addClass('hide');
        logoutButton.addClass('hide');
        home.addClass('hide');
      }).catch((err) => console.error('you still logged in', err));
  });
};

export default { logoutEvent };
