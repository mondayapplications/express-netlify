const axios = require("axios");

const BASE_URL = "http://www.lior-kedem.com";
const SWISH_MACHINE_URL = `${BASE_URL}/swish/machine_merged.php`;

class SwishService {
  static async addUpdatePlayersBasicInfo(players) {
    const playersArr = Object.values(players);
    const fakePlayer = { ...playersArr[0] };
    fakePlayer.id = "lawer";
    fakePlayer.team = "CLE";
    const smallSample = [fakePlayer, playersArr[0], playersArr[1]];
    // const serializedPlayers = playersArr.map((player) =>
    const serializedPlayers = smallSample.map((player) =>
      convertKeyToUppercase(player)
    );
    const body = {
      TAG: "addUpdatePlayersBasicInfo",
      DATA: serializedPlayers,
    };

    console.log(body);

    // const usersName = JSON.stringify({ name: "John Doe" });
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // const result = await axios.post(
    //   "https://testapi.org/post",
    //   usersName,
    //   customConfig
    // );

    const response = await axios.post(
      SWISH_MACHINE_URL,
      JSON.stringify(body),
      customConfig
    );

    return { status: response.status, data: response.data, body };
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
