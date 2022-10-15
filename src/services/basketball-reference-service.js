const _ = require("lodash");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const moment = require("moment");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const LEVEL_1_HREF_PATH = "children[0].attribs.href";
const LEVEL_1_DATA_PATH = "children[0].data";
const LEVEL_2_DATA_PATH = "children[0].children[0].data";

class BasketballReferenceService {
  static async getTeamPlayers(teamId, season) {
    try {
      const teamUrl = `https://www.basketball-reference.com/teams/${teamId}/${season}.html`;
      const teamPlayers = await scrapePlayersFromTeamUrl(teamUrl, teamId);
      return teamPlayers;
    } catch (error) {
      console.log(error);
    }
  }

  static async getDailyLeaders(day, month, year) {
    try {
      const dailyLeadersUrl = `https://www.basketball-reference.com/friv/dailyleaders.fcgi?month=${month}&day=${day}&year=${year}&type=all`;
      const dailyLeadersPlayers = await scrapePlayersFromDailyLeaders(
        dailyLeadersUrl
      );
      return dailyLeadersPlayers;
    } catch (error) {
      console.log(error);
    }
  }
}

async function scrapePlayersFromTeamUrl(teamUrl, team) {
  const response = await fetch(teamUrl);
  const body = await response.text();
  const $ = cheerio.load(body);
  const listItems = $(".sortable tbody tr");
  const players = {};
  listItems.each((idx, el) => {
    const tableRow = $(el).children("td");
    const id = _.get(tableRow[0], LEVEL_1_HREF_PATH, "")
      .replace("/players/", "")
      .replace(".html", "")
      .split("/")[1];

    if (!players[id]) {
      const name = _.get(tableRow[0], LEVEL_2_DATA_PATH);
      const position = _.get(tableRow[1], LEVEL_1_DATA_PATH);
      const height = _.get(tableRow[2], LEVEL_1_DATA_PATH);
      const player = {
        id,
        name,
        position,
        height,
        team,
        health: "",
        image: "",
        image_credit: "",
        image_credit_url: "",
        extra_info: "",
      };

      players[id] = player;
    }
  });

  return players;
}

async function scrapePlayersFromDailyLeaders(dailyLeadersUrl) {
  try {
    const response = await fetch(dailyLeadersUrl);
    const body = await response.text();
    const $ = cheerio.load(body);
    const listItems = $(".sortable tbody tr");
    const players = {};
    listItems.each((idx, el) => {
      const tableRow = $(el).children("td");

      const playerId = _.get(tableRow[0], LEVEL_1_HREF_PATH, "")
        .replace("/players/", "")
        .replace(".html", "")
        .split("/")[1];
      if (!players[playerId]) {
        const team = _.get(tableRow[1], LEVEL_2_DATA_PATH);
        const court = _.get(tableRow[2], LEVEL_1_DATA_PATH) === "@" ? "A" : "H";
        const opp = _.get(tableRow[3], LEVEL_2_DATA_PATH);
        const gp = 1;
        const result = _.get(tableRow[4], LEVEL_2_DATA_PATH);
        const min = moment
          .duration(_.get(tableRow[5], LEVEL_1_DATA_PATH))
          .asHours();
        const fgm = _.get(tableRow[6], LEVEL_1_DATA_PATH);
        const fga = _.get(tableRow[7], LEVEL_1_DATA_PATH);
        const fgpct = _.get(tableRow[8], LEVEL_1_DATA_PATH, "0");
        const tpm = _.get(tableRow[9], LEVEL_1_DATA_PATH);
        const tpa = _.get(tableRow[10], LEVEL_1_DATA_PATH);
        const tppct = _.get(tableRow[11], LEVEL_1_DATA_PATH, "0");
        const ftm = _.get(tableRow[12], LEVEL_1_DATA_PATH);
        const fta = _.get(tableRow[13], LEVEL_1_DATA_PATH);
        const ftpct = _.get(tableRow[14], LEVEL_1_DATA_PATH, "0");
        const oreb = _.get(tableRow[15], LEVEL_1_DATA_PATH);
        const dreb = _.get(tableRow[16], LEVEL_1_DATA_PATH);
        const treb = _.get(tableRow[17], LEVEL_1_DATA_PATH);
        const ast = _.get(tableRow[18], LEVEL_1_DATA_PATH);
        const stl = _.get(tableRow[19], LEVEL_1_DATA_PATH);
        const blk = _.get(tableRow[20], LEVEL_1_DATA_PATH);
        const tov = _.get(tableRow[21], LEVEL_1_DATA_PATH);
        const pts = _.get(tableRow[23], LEVEL_1_DATA_PATH);

        const player = {
          playerId,
          team,
          court,
          opp,
          gp,
          result,
          min,
          fgm,
          fga,
          fgpct,
          tpm,
          tpa,
          tppct,
          ftm,
          fta,
          ftpct,
          oreb,
          dreb,
          treb,
          ast,
          stl,
          blk,
          tov,
          pts,
        };

        players[playerId] = player;
      }
    });

    return players;
  } catch (error) {
    console.error(error);
  }
}

module.exports = BasketballReferenceService;
