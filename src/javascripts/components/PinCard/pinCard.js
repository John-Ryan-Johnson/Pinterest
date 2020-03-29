import './pinCard.scss';

const buildPins = (pin) => {
  let domString = '';
  domString += '<div class="row">';
  domString += '<div class="col">';
  domString += '<div class="card pinCard mt-5 mb-5">';
  domString += '<button class="btn btn-danger btn-circle btn-sm d-flex ml-auto delete-pin"><i class="fas fa-skull"></i></button>';
  domString += `<img src="${pin.imageUrl}" class="cardImg" height="400px" width= "400px" alt="...">`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildPins };