import './pinCardMaker.scss';


const makePinCard = (pin) => {
  const domString = `
  <div class="card col-4 p-0 pinCard d-inline-flex ml-4 mb-4">
  <img src=${pin.imageURL}>
    <div class="card-body text-center">
      <h4 class="card-title">${pin.name}</h4>
      <p>${pin.description}</p>
      <button class="delete-button"data-boardId=${pin.boardId} id="${pin.id}">Delete</button>
    </div>
  </div>
  `;
  return domString;
};

export default { makePinCard };
