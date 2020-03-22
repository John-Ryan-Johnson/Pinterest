import firebase from 'firebase/app';
import './singleBoard.scss';


const boardCard = (board) => {
  const getCurrentUid = () => firebase.auth().currentUser.uid;
  let domString = '';
  if (getCurrentUid) {
    domString += `
  <div class="card col-12 mb-5">
  <h3 class="card-title text-center">${board.name}</h3>
  <h5 class="card-text text-center">${board.boardDescription}</h5>
  <button class="board-button mb-2" id="${board.id}">View Pins</button>
  <button class="delete-board mb-2" data-boardId="${board.id}" id = "${board.id}">Delete Board</button>
  <button type="button" class="add-pin mb-2" data-toggle="modal" data-target="#examplePinModal">Add Pin</button>
  </div>`;
  } else {
    domString = `
  <div class="card col-4">
  <h4 class="card-title text-center">EMPTY</h4>`;
  }
  return domString;
};

export default { boardCard };
