import $ from 'jquery';
import firebase from 'firebase/app';
import utilities from '../../helpers/utilities';
import card from '../SingleBoard/singleBoard';
import b from '../../helpers/data/boardData';
import './boards.scss';
import pinsData from '../../helpers/data/pinsData';
import pinCardMaker from '../makePinCard/pinCardMaker';

const pinBoardDeleteEvent = (event) => {
  event.preventDefault();
  const boardId = event.target.id;
  b.deleteBoard(boardId)
    .then(() => {
      pinsData.getPins(boardId)
        .then((pins) => {
          pins.forEach((pin) => {
            pinsData.deletePin(pin.id);
          });
          const { uid } = firebase.auth().currentUser;
          // eslint-disable-next-line no-use-before-define
          makeABoard(uid);
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};

const addNewPin = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newPin = {
    name: $('#pin-name').val(),
    boardId: $('.board-title')[0].id,
    url: $('#url').val(),
    imgUrl: $('#pin-image-url').val(),
    uid,
  };
  pinsData.addNewPin(newPin)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      makeABoard('boardId');
    })
    .catch((error) => console.error(error));
};


const pinCardDeleteEvent = (event) => {
  event.preventDefault();
  pinsData.deletePin(event.target.id)
    .then(() => {
      let pinBucket = '';
      const boardId = event.target.dataset.boardid;
      pinsData.getPins(boardId)
        .then((pins) => {
          pins.forEach((pin) => {
            pinBucket += pinCardMaker.makePinCard(pin);
          });
          utilities.printToDom('board', pinBucket);
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};

const boardEvents = () => {
  $('.board-button').click((event) => {
    const boardId = event.target.id;
    let pinBucket = '';
    pinsData.getPins(boardId)
      .then((pins) => {
        pins.forEach((pin) => {
          pinBucket += pinCardMaker.makePinCard(pin);
        });
        utilities.printToDom('board', pinBucket);
      })
      .catch((error) => console.error(error));
  });
};

const addNewBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    name: $('#board-name').val(),
    img: $('#board-img').val(),
    id: $('#board-id').val(),
    uid,
  };
  b.addNewBoard(newBoard)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      makeABoard();
    })
    .catch((error) => console.error(error));
};

const makeABoard = (uid) => {
  b.getBoards(uid)
    .then((boards) => {
      let domString = '<h2 class="text-center text-white">MY BOARDS</h2>';
      domString += '<div class="col-12 d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += card.boardCard(board);
      });
      domString += '</div>';
      utilities.printToDom('board', domString);
      boardEvents();
      $('#board').on('click', '.delete-button', pinCardDeleteEvent);
      $('#board').on('click', '.delete-board', pinBoardDeleteEvent);
      $('#boards').on('click', '.add-board', addNewBoard);
      $('#add-new-board').click(addNewBoard);
      $('#add-pin').click(addNewPin);
    })
    .catch((error) => console.error(error));
};

export default { makeABoard };
