import './boardCard.scss';

const buildBoards = (board) => {
  let domString = '';
  domString += '<div class="row">';
  domString += '<div class="col">';
  domString += `<div class="card board-card m-5" id="${board.id}">`;
  domString += `<h4 class="card-header text-center text-white bg-danger">${board.name}</h4>`;
  domString += ` <img src="${board.imgUrl}" class="cardImg" height="400px" width= "400px" alt="..."></h4>`;
  domString += '<div class="card-body">';
  domString += `<h5 class="text-center">${board.description}</h5>`;
  domString += '<div class="btnContainer">';
  domString += `<button type="button" id="pins-${board.id}" class="btn btn-outline-danger d-flex mr-auto mb-0 pinsView">View Pins</button>`;
  domString += `<button id="delete-${board.id}" class="btn btn-danger d-flex ml-auto delete-board"><i class="fas fa-trash-alt"></i></button>`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildBoards };
