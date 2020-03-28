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
      domString += '<button class="btn btn-danger mt-4 ml-5" id="back-to-boards">Back To Boards</button>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      pins.forEach((pin) => {
        domString += '<div class="row">';
        domString += '<div class="col">';
        domString += '<div class="card pinCard mt-5 mb-5">';
        domString += '<button class="btn btn-danger btn-circle btn-sm d-flex ml-auto delete-pin"><i class="fas fa-skull"></i></button>';
        domString += `<img src="${pin.imageUrl}" class="cardImg" height="400px" width= "400px" alt="...">`;
        domString += '</div>';
        domString += '</div>';
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
