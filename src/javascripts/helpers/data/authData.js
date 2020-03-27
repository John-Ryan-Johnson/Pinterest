import firebase from 'firebase/app';
import 'firebase/auth';
import boardRoom from '../../components/boardRoom/boardRoom';
import home from '../../components/home/home';

const authDiv = $('#auth');
const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-button');
const singleBoardView = $('#single-board');


const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      singleBoardView.removeClass('hide');
      boardRoom.buildBoardRoom();
    } else {
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logoutButton.addClass('hide');
      singleBoardView.addClass('hide');
      home.homeMaker();
    }
  });
};

export default { checkLoginStatus };
