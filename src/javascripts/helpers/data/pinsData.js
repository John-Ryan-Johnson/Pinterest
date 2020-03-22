import axios from 'axios';
import apikeys from '../apiKeys.json';

const baseUrl = apikeys.firebaseKeys.databaseURL;

const getPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((fbId) => {
        demPins[fbId].id = fbId;
        pins.push(demPins[fbId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});


const deletePin = (id) => axios.delete(`${baseUrl}/pins/${id}.json`);

const addNewPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const bothPinAndBoard = (boardId) => {
  getPins(boardId)
    .then((pins) => {
      pins.forEach((pin) => {
        deletePin(pin.id);
      });
    });
};


export default {
  getPins,
  deletePin,
  addNewPin,
  bothPinAndBoard,
};
