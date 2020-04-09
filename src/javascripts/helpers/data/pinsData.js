import axios from 'axios';
import apikeys from '../apiKeys.json';

const baseUrl = apikeys.firebaseKeys.databaseURL;


const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
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


const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addNewPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);


export default { getPinsByBoardId, deletePin, addNewPin };
