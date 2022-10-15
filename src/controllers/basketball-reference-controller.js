const _ = require("lodash");
const BasketballReferenceService = require("../services/basketball-reference-service");

class BasketballReferenceController {
  static async getTeamPlayers(req, res) {
    const { teamId, season } = req.query;
    const teamPlayers = await BasketballReferenceService.getTeamPlayers(
      teamId,
      season
    );

    res.json(teamPlayers);
  }

  static async getDailyLeaders(req, res) {
    const { day, month, year } = req.query;
    const teamPlayers = await BasketballReferenceService.getDailyLeaders(
      day,
      month,
      year
    );

    res.json(teamPlayers);
  }
}

module.exports = BasketballReferenceController;
