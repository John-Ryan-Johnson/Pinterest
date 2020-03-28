import axios from 'axios';
import apikeys from '../apiKeys.json';

const baseUrl = apikeys.firebaseKeys.databaseURL;


const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((pinId) => {
        demPins[pinId].id = pinId;
        pins.push(demPins[pinId]);
      });
      resolve(pins);
    })
    .catch((err) => reject(err));
});


const deletePin = (id) => axios.delete(`${baseUrl}/pins/${id}.json`);

export default { getPinsByBoardId, deletePin };
