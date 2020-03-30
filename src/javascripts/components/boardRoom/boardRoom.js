import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from '../../helpers/data/boardsData';
import boardCard from '../BoardCard/boardCard';
import pins from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import './boardRoom.scss';

const showPins = (e) => {
  const boardId = e.target.id.split('pins-')[1];
  pins.printPins(boardId);
  $('#boards').html('');
};

const deleteABoard = (e) => {
  e.preventDefault();
  const boardId = e.target.closest('.card').id;
  boardsData.deleteBoard(boardId)
    .then(() => {
      pinsData.getPins(boardId)
        .then((thesePins) => {
          thesePins.forEach((pin) => {
            pinsData.deletePin(pin.id);
          });
          // eslint-disable-next-line no-use-before-define
          buildBoardRoom();
        })
        .catch((error) => console.error(error));
    });
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
      $('body').on('click', '.pinsView', showPins);
      $('body').on('click', '.delete-board', deleteABoard);
    })
    .catch((err) => console.error(err));
};

export default { buildBoardRoom };
