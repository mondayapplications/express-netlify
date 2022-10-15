const _ = require("lodash");
const PlayerService = require("../services/player-service");

class PlayerController {
  static async getPlayer(req, res) {
    const { playerName } = req.query;
    const player = await PlayerService.getPlayer(playerName);

    res.json(player);
  }
}

module.exports = PlayerController;
