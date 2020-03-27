import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import './pins.scss';

const printBoard = () => {
  $('#boards').removeClass('hide');
  $('#single-board').addClass('hide');
};

const pinEvents = () => {
  $('#boards').addClass('hide');
  $('#back-to-boards').on('click', printBoard);
};

const printPins = (e) => {
  const boardId = e.target.closest('.card').id;
  pinsData.getPinsByBoardId(boardId)
    .then((response) => {
      const pins = response;
      let domString = '';
      domString += '<button class="btn btn-danger mt-2 ml-5" id="back-to-boards">Back To Boards</button>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      pins.forEach((pin) => {
        domString += '<div class="card pinCard mx-auto mt-3 mb-3" style="max-width: 30rem;">';
        domString += `<img src="${pin.imageUrl}" class="image">`;
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('single-board', domString);
      $('#single-board').removeClass('hide');
      pinEvents();
    })
    .catch((err) => console.error('Pins not working', err));
};

export default { printPins };
