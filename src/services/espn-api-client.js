const fetch = require("node-fetch");

class EspnApiClient {
  static async getTeamList() {
    const baseUrl =
      "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams";
    const fullUrl = `${baseUrl}?limit=1000`;

    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await fetch(fullUrl, fetchOptions);
    return data;
  }

  static async getTeamPlayers(teamId) {
    const baseUrl = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamId}`;
    const fullUrl = `${baseUrl}?enable=roster`;

    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await fetch(fullUrl, fetchOptions);
    return data;
  }
}

module.exports = EspnApiClient;
