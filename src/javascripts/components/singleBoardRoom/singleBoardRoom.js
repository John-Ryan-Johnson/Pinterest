import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import pinCard from '../PinCard/pinCard';
import utils from '../../helpers/utils';
import './singleBoardRoom.scss';

const deleteAPin = (e) => {
  const pinId = e.target.closest('.card').id;
  const boardId = e.target.closest('.board-id').id;
  pinsData.deletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printPins(boardId);
    })
    .catch((err) => console.error('Delete pin broke', err));
};

const createPinModalRadios = (e) => {
  const pinId = e.target.id.split('update-')[1];
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoardsByUid(uid)
    .then((boards) => {
      let domString = '';
      boards.forEach((board) => {
        domString += `<div class="pin-radios">
        <input class="form-check-input" type="radio" name="exampleRadios" id="${board.name}-radio" value="${board.id}">
        <label class="form-check-label" for="exampleRadios1">
          ${board.name}
          </label>
          </div>`;
      });
      utils.printToDom('board-update-radios', domString);
    });
  $('.update-pin').attr('id', pinId);
};

const moveAPin = (e) => {
  e.preventDefault();
  const pinId = e.target.id;
  const selectedBoard = $('input:checked').val();
  pinsData.getPinById(pinId)
    .then((response) => {
      const selectedPin = response.data;
      const newPin = {
        name: selectedPin.name,
        imageUrl: selectedPin.imageUrl,
        boardId: `${selectedBoard}`,
        pinId: `${pinId}`,
      };
      pinsData.updatePin(pinId, newPin);
    })
    .catch((error) => console.error(error));
};


const addAPin = (e) => {
  e.stopImmediatePropagation();
  const boardId = $('.pin')[0].id;
  const newPin = {
    name: $('#pin-name').val(),
    imageUrl: $('#pin-image-url').val(),
    boardId,
  };
  pinsData.addPin(newPin)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printPins(boardId);
    })
    .catch((error) => console.error(error));
};

const addPinModalEvents = () => {
  $('#add-pin-button').click(() => {
    $('#pinModal').show();
  });
  $('#close-pin-modal').click(() => {
    $('#pinModal').hide();
    $('.modal-body input').val('');
  });
};

const movePinModalEvents = () => {
  const boardId = $('.pin')[0].id;
  $('.update-pin-button').click(() => {
    $('#update-pin-modal').show();
  });
  $('#close-updatedPin-modal').click(() => {
    $('#update-pin-modal').hide();
    // eslint-disable-next-line no-use-before-define
    printPins(boardId);
  });
};

const printPins = (boardId) => {
  pinsData.getPinsByBoardId(boardId)
    .then((pins) => {
      let domString = '';
      domString = '<h1 class="pinTitle text-center text-white mt-3">My Pins</h1>';
      domString += '<a href="/" class="btn btn-danger ml-5" id="back-to-boards">Back To Boards</a>';
      domString += '<button type="button" class="btn btn-danger ml-5" id="add-pin-button" data-toggle="modal" data-target="#exampleModal">Add Pin</button>';
      domString += `<div class="d-flex flex-wrap justify-content-center pin" id="${boardId}">`;
      pins.forEach((pin) => {
        domString += pinCard.buildPins(pin);
      });
      domString += '</div>';
      utils.printToDom('single-board', domString);
      $('body').on('click', '.delete-pin', deleteAPin);
      $('.update-pin-button').click(createPinModalRadios);
      $('#add-new-pin').click(addAPin);
      $('.update-pin').click(moveAPin);
      addPinModalEvents();
      movePinModalEvents();
    })
    .catch((err) => console.error('Pins not working', err));
};

export default {
  printPins,
  addAPin,
};
