import $ from 'jquery';
import utilities from '../../helpers/utilities';
import card from '../SingleBoard/singleBoard';
import b from '../../helpers/data/boardData';
import './boards.scss';
import pinsData from '../../helpers/data/pinsData';
import pinCardMaker from '../makePinCard/pinCardMaker';

const boardEvents = () => {
  $('.board-button').click((event) => {
    const boardId = event.target.id;
    let pinBucket = '';
    pinsData.getPins(boardId)
      .then((pins) => {
        pins.forEach((pin) => {
          pinBucket += pinCardMaker.makePinCard(pin);
        });
        utilities.printToDom('board', pinBucket);
      })
      .catch((error) => console.error(error));
  });
};

const makeABoard = (uid) => {
  b.getBoards(uid)
    .then((boards) => {
      let domString = '<h2 class="text-center">MY BOARDS</H2>';
      domString += '<div class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += card.boardCard(board);
      });
      domString += '</div>';
      utilities.printToDom('board', domString);
      boardEvents();
    })
    .catch((error) => console.error(error));
};

export default { makeABoard };
