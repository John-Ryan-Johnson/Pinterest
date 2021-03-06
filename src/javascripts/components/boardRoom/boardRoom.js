import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from '../../helpers/data/boardsData';
import boardCard from '../BoardCard/boardCard';
import singleBoard from '../singleBoardRoom/singleBoardRoom';
import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import './boardRoom.scss';

const showPins = (e) => {
  const boardId = e.target.id.split('pins-')[1];
  singleBoard.printPins(boardId);
  $('#boards').html('');
};

const deleteABoard = (e) => {
  e.preventDefault();
  const boardId = e.target.closest('.card').id;
  boardsData.deleteBoard(boardId)
    .then(() => {
      pinsData.getPinsByBoardId(boardId)
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

const addABoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    name: $('#board-name').val(),
    description: $('#board-description').val(),
    imgUrl: $('#board-image-url').val(),
    uid,
  };
  boardsData.addBoard(newBoard)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoardRoom();
    })
    .catch((error) => console.error(error));
};

const boardEvents = () => {
  $('#add-board-button').click(() => {
    $('#boardModal').show();
  });
  $('#close-board-modal').click(() => {
    $('#boardModal').hide();
    $('.modal-body input').val('');
  });
};

const buildBoardRoom = () => {
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoardsByUid(uid)
    .then((boards) => {
      let domString = '';
      domString += '<h1 class="title text-center text-white mt-3">My Boards</h1>';
      domString += '<button type="button" class="btn btn-danger ml-5" id="add-board-button" data-toggle="modal" data-target="#exampleModal">Add Board</button>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += boardCard.buildBoards(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.pinsView', showPins);
      $('body').on('click', '.delete-board', deleteABoard);
      $('#add-new-board').click(addABoard);
      boardEvents();
    })
    .catch((err) => console.error(err));
};

export default { buildBoardRoom, addABoard };
