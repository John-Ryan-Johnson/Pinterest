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

const printPins = (boardId) => {
  pinsData.getPinsByBoardId(boardId)
    .then((pins) => {
      let domString = '';
      domString = '<h1 class="pinTitle text-center text-white mt-3">My Pins</h1>';
      domString += '<a href="/" class="btn btn-danger ml-5" id="back-to-boards">Back To Boards</a>';
      domString += `<div class="d-flex flex-wrap justify-content-center" id="${boardId}">`;
      pins.forEach((pin) => {
        domString += pinCard.buildPins(pin);
      });
      domString += '</div>';
      utils.printToDom('single-board', domString);
      $('body').on('click', '.delete-pin', deleteAPin);
    })
    .catch((err) => console.error('Pins not working', err));
};

export default { printPins };
