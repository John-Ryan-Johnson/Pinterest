import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from '../../helpers/data/boardsData';
import boardCard from '../BoardCard/boardCard';
import pins from '../pins/pins';
import utils from '../../helpers/utils';
import './boardRoom.scss';

const showPins = (e) => {
  const boardId = e.target.id.split('pins-')[1];
  pins.printPins(boardId);
  $('#boards').html('');
};

const buildBoardRoom = () => {
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoards(uid)
    .then((boards) => {
      let domString = '';
      domString += '<h1 class="title text-center text-white mt-3">My Boards</h1>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += boardCard.buildBoards(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('#boards').on('click', '.pinsView', showPins);
    })
    .catch((err) => console.error(err));
};

export default { buildBoardRoom };
