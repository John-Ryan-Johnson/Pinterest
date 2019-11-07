import firebase from 'firebase/app';
import 'firebase/auth';
import './boardCard.scss';

const boardCard = (board) => {
  const getCurrentUid = () => firebase.auth().currentUser.uid;
  let domString = '';
  if (getCurrentUid) {
    domString += `
  <div class="card col-4">
  <h5 class="card-title text-center">${board.name}</h5>
  <div class="card-body">
  <p class="card-text text-center">${board.description}</p>
  </div>
  </div>`;
  } else {
    domString = `
  <div class="card col-4">
  <h5 class="card-title text-center">EMPTY</h5>`;
  }
  return domString;
};

export default { boardCard };
