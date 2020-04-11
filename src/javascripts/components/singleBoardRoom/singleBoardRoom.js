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
  });
};

const movePinModalEvents = () => {
  $('.update-pin-button').click(() => {
    $('#update-pin-modal').show();
  });
  $('#close-updatedPin-modal').click(() => {
    $('#update-pin-modal').hide();
    $('.modal-body input').val('');
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
      $('#add-new-pin').click(addAPin);
      addPinModalEvents();
      movePinModalEvents();
    })
    .catch((err) => console.error('Pins not working', err));
};

export default {
  printPins,
  addAPin,
};
