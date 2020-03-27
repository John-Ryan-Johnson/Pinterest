import './boards.scss';

const buildBoards = (board) => {
  let domString = '';
  domString += '<div class="col-4 m-3">';
  domString += `<div id="${board.id}" class="card board-card">`;
  domString += `<h4 class="card-header text-center text-white bg-danger">${board.name}</h4>`;
  domString += '<div class="card-body">';
  domString += `<h5 class="text-center">${board.description}</h5>`;
  domString += '<button class="btn btn-danger d-flex ml-auto delete-board"><i class="fas fa-trash-alt"></i></button>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildBoards };
