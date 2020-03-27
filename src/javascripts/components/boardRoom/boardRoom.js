import boardsData from '../../helpers/data/boardsData';
import boardsComponent from '../boards/boards';
import pins from '../pins/pins';
import utils from '../../helpers/utils';
import './boardRoom.scss';

const buildBoardRoom = () => {
  boardsData.getBoards()
    .then((boards) => {
      let domString = '';
      domString += '<h1 class="title text-center text-white mt-3">My Boards</h1>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += boardsComponent.buildBoards(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.board-card', pins.printPins);
    })
    .catch((err) => console.error(err));
};

export default { buildBoardRoom };
