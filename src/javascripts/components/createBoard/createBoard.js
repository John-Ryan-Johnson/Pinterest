import firebase from 'firebase/app';
import boardData from '../../helpers/data/boardData';
import boards from '../boards/boards';

const addNewBoardByUser = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    name: $('#board-name').val(),
    description: $('#board-description').val(),
    uid,
  };
  boardData.addNewBoard(newBoard)
    .then(() => {
      $('#board').modal('hide');
      boards.makeABoard(uid);
    })
    .catch((error) => console.error(error));
};

export default { addNewBoardByUser };
