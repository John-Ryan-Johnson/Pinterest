import './pinCard.scss';

const buildPins = (pin) => {
  let domString = '';
  domString += '<div class="row justify-content-center">';
  domString += '<div class="col">';
  domString += `<div class="card pinCard mt-5 mb-5" id="${pin.id}">`;
  domString += `<div class="board-id" id="${pin.boardId}">`;
  domString += '<button class="btn btn-danger btn-circle btn-sm d-flex ml-auto delete-pin"><i class="fas fa-skull"></i></button>';
  domString += `<img src="${pin.imageUrl}" class="cardImg" height="400px" width= "400px" alt="...">`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildPins };
