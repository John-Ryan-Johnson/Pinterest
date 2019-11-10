import util from '../../helpers/utilities';
import './home.scss';

const homeMaker = () => {
  const domString = '<h1 class="text-center text-danger">Pinterested ?</h1>';
  util.printToDom('home', domString);
};

export default { homeMaker };
