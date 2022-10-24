const axios = require("axios");

const BASE_URL = "http://www.lior-kedem.com";
const SWISH_MACHINE_URL = `${BASE_URL}/swish/machine_merged.php`;

class SwishService {
  static async addUpdatePlayersBasicInfo(players) {
    const playersArr = Object.values(players);
    const smallSample = [playersArr[0], playersArr[1]];
    // const serializedPlayers = playersArr.map((player) =>
    const serializedPlayers = smallSample.map((player) =>
      convertKeyToUppercase(player)
    );
    const body = {
      TAG: "addUpdatePlayersBasicInfo",
      DATA: serializedPlayers,
    };

    console.log(body);

    const fullUrl = `${SWISH_MACHINE_URL}?TAG=${body.TAG}&DATA=${body.DATA}`;

    // const response = await axios.post(SWISH_MACHINE_URL, body);
    const response = await axios.post(fullUrl, {});
    return body;
  }
}

function convertKeyToUppercase(obj) {
  let key,
    keys = Object.keys(obj);
  let n = keys.length;
  const newObj = {};
  while (n--) {
    key = keys[n];
    newObj[key.toUpperCase()] = obj[key];
  }
  return newObj;
}

module.exports = SwishService;
