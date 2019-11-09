import firebase from 'firebase/app';
import 'firebase/auth';
import './singleBoard.scss';


const boardCard = (board) => {
  const getCurrentUid = () => firebase.auth().currentUser.uid;
  let domString = '';
  if (getCurrentUid) {
    domString += `
  <div class="card col-4">
  <h4 class="card-title text-center">${board.name}</h4>
  <p class="card-text text-center">${board.boardDescription}</p>
  <button class="board-button" id="${board.id}">View Pins</button>
  </div>`;
  } else {
    domString = `
  <div class="card col-4">
  <h4 class="card-title text-center">EMPTY</h4>`;
  }
  return domString;
};

export default { boardCard };
