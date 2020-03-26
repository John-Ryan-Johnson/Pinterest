import util from '../../helpers/utils';
import './home.scss';

const homeMaker = () => {
  const domString = '<h1 class="text-center text-danger mt-3">Are You Pinterested ?</h1>';
  util.printToDom('home', domString);
};

export default { homeMaker };
