import util from '../../helpers/utilities';

const boardMaker = () => {
  const domString = '<h1 class="text-center">Boards</h1>';
  util.printToDom('board', domString);
};

export default { boardMaker };
