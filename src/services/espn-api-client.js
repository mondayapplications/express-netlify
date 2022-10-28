const axios = require("axios");

class EspnApiClient {
  static async getTeamList() {
    const baseUrl =
      "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams";
    const params = {
      limit: 1000,
    };

    const res = await axios.get(baseUrl, {
      params,
    });

    return res.data;
  }

  static async getTeamPlayers(teamId) {
    const baseUrl = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamId}`;
    const params = {
      enable: "roster",
    };
    const res = await axios.get(baseUrl, {
      params,
    });
    return res.data;
  }

  static async getScoreboard(year, month, day) {
    const scoreboardDate = `${year}${
      parseInt(month) <= 9 ? "0" + parseInt(month) : parseInt(month)
    }${parseInt(day) <= 9 ? "0" + parseInt(day) : parseInt(day)}`;
    const baseUrl = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`;
    const params = {
      dates: scoreboardDate,
      limit: 300,
    };
    const res = await axios.get(baseUrl, {
      params,
    });
    return res.data;
  }

  static async getBoxScore(gameId) {
    const baseUrl = "http://cdn.espn.com/core/nba/boxscore";
    const params = {
      gameId,
      xhr: 1,
      render: false,
      device: "desktop",
      userab: 18,
    };
    const res = await axios.get(baseUrl, {
      params,
    });
    const { boxscore } = res.data.gamepackageJSON;
    return boxscore;
  }
}

module.exports = EspnApiClient;
