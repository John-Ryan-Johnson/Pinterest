import boardsData from './boardsData';
import pinsData from './pinsData';

const getboardWithPins = (boardId) => new Promise((resolve, reject) => {
  boardsData.getBoardById(boardId)
    .then((response) => {
      const board = response.data;
      board.id = boardId;
      board.pins = [];
      pinsData.getPinsByBoardId(board.id).then((pins) => {
        if (pins) {
          pins.forEach((pin) => {
            board.pins.push(pin);
            resolve(board);
          });
        }
      });
    })
    .catch((err) => reject(err));
});

export default { getboardWithPins };
