const _ = require("lodash");
const fetch = require("node-fetch");
const sdv = require("sportsdataverse");
const PlayerService = require("./player-service");

class TeamService {
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

    return await fetch(fullUrl, fetchOptions);
  }

  static async getTeamPlayers(teamId) {
    const { team } = await sdv.nba.getTeamPlayers(teamId);
    const { athletes: players } = team;
    const serializedPlayers = players.map((player) =>
      PlayerService.serializePlayer(player, team)
    );
    return serializedPlayers;
  }
}

module.exports = TeamService;
