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
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      singleBoardView.removeClass('hide');
      logoutButton.removeClass('hide');
      authDiv.addClass('hide');
      boardRoom.buildBoardRoom(user.uid);
    } else {
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      singleBoardView.addClass('hide');
      logoutButton.addClass('hide');
      home.homeMaker();
    }
  });
};

export default { checkLoginStatus };
