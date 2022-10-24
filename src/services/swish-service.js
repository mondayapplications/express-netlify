const _ = require("lodash");
const fetch = require("node-fetch");

const BASE_URL = "http://www.lior-kedem.com";
const SWISH_MACHINE_URL = `${BASE_URL}/swish/machine_merged.php`;

class SwishService {
  static async addUpdatePlayersBasicInfo(players) {
    const playersArr = Object.values(players);
    const serializedPlayers = playersArr.map((player) =>
      convertKeyToUppercase(player)
    );
    const body = {
      TAG: "addUpdatePlayersBasicInfo",
      DATA: JSON.stringify(serializedPlayers),
    };

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(SWISH_MACHINE_URL, fetchOptions);
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
