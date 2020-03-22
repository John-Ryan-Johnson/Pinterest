import firebase from 'firebase/app';
import makePinCard from '../makePinCard/pinCardMaker';
import pinData from '../../helpers/data/pinsData';

const addNewPinToBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const boardId = $('#board').find('.pinCard').attr('id');
  const newPin = {
    name: $('#pin-name').val(),
    imageUrl: $('#image-url').val(),
    description: $('#pin-description').val(),
    uid,
    boardId,
  };
  pinData.addNewPin(newPin)
    .then(() => {
      $('#exampleModal').modal('hide');
      makePinCard.printUserPins(boardId);
    })
    .catch((error) => console.error(error));
};

export default { addNewPinToBoard };
