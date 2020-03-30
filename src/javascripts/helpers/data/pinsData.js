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

const getPinById = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

export default { getPins, deletePin, getPinById };
