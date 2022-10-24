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
}

module.exports = EspnApiClient;
