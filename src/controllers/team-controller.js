const _ = require("lodash");
const TeamService = require("../services/team-service");

class TeamController {
  static async getTeamPlayers(req, res) {
    const { teamId } = req.query;
    const players = await TeamService.getTeamPlayers(teamId);

    res.json(players);
  }
}

module.exports = TeamController;
