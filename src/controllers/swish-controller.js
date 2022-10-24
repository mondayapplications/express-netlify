const TeamService = require("../services/team-service");
const SwishService = require("../services/swish-service");

class SwishController {
  static async addUpdatePlayersBasicInfo(req, res) {
    try {
      let players = {};
      const teams = await TeamService.getTeams();
      for (const { team } of teams) {
        const { id: teamId } = team;
        const teamPlayers = await TeamService.getTeamPlayers(teamId);

        for (const player of teamPlayers) {
          players[player.id] = player;
        }
      }

      const result = await SwishService.addUpdatePlayersBasicInfo(players);
      res.json(result);
    } catch (error) {
      res.json(error);
      console.log("--------this is my error----------", error);
    }
  }
}

module.exports = SwishController;
