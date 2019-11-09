import util from '../../helpers/utilities';

const homeMaker = () => {
  const domString = '<h1 class="text-center">Pinterested ?</h1>';
  util.printToDom('home', domString);
};

export default { homeMaker };
