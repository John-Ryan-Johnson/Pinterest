import board from '../../helpers/data/boardData';

const buildTheMachine = () => {
  board.getBoards()
    .then((singleUser) => console.log('1 machine', singleUser))
    .catch((error) => console.error(error));
};

export default { buildTheMachine };
