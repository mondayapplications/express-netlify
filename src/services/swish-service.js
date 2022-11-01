const axios = require("axios");

const BASE_URL = "http://www.lior-kedem.com";
const SWISH_MACHINE_URL = `${BASE_URL}/swish/machine_merged.php`;

class SwishService {
  static async addUpdatePlayersBasicInfo(players, { debugMode }) {
    const playersArr = Object.values(players);
    const serializedPlayers = playersArr.map((player) =>
      convertKeyToUppercase(player)
    );
    const body = {
      TAG: "addUpdatePlayersBasicInfo",
      DATA: JSON.stringify(serializedPlayers),
    };

    if (debugMode) {
      return { debugMode, body };
    }

    const response = await axios.post(SWISH_MACHINE_URL, body);
    return { debugMode, body, status: response?.status, data: response?.data };
  }

  static async addDailyGameLogs(dailyGameLogs, { debugMode }) {
    const playersArr = Object.values(dailyGameLogs);
    const serializedPlayers = playersArr.map((player) =>
      convertKeyToUppercase(player)
    );
    const body = {
      TAG: "addDailyGameLogs",
      DATA: JSON.stringify(serializedPlayers),
    };

    if (debugMode) {
      return { debugMode, body };
    }

    const response = await axios.post(SWISH_MACHINE_URL, body);
    return { debugMode, body, status: response?.status, data: response?.data };
  }

  static async calculatePeriodAverages(daysBack, { debugMode }) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const firstDate = new Date();
    const lastDate = new Date();
    lastDate.setDate(today.getDate() - 1);
    let period, firstDay, lastDay;

    let year = yesterday.getUTCFullYear();
    let month = yesterday.getUTCMonth() + 1; //months from 1-12
    let day = yesterday.getUTCDate();

    lastDay = year + "-" + month + "-" + day;

    if (daysBack) {
      firstDate.setDate(yesterday.getDate() - daysBack);
      year = firstDate.getUTCFullYear();
      month = firstDate.getUTCMonth() + 1; //months from 1-12
      day = firstDate.getUTCDate();

      firstDay = year + "-" + month + "-" + day;
      period = "LAST_" + daysBack;
    } else {
      firstDay = "2022-10-18";
      period = "CURR_SEASON";
    }

    const body = {
      TAG: "calculatePeriodAverages",
      DATA: JSON.stringify({
        FIRST_DAY: firstDay,
        LAST_DAY: lastDay,
        PERIOD: period,
      }),
    };

    if (debugMode) {
      return { debugMode, body };
    }

    const response = await axios.post(SWISH_MACHINE_URL, body);
    return { debugMode, body, status: response?.status, data: response?.data };
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
