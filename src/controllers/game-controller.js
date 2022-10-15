const _ = require("lodash");
const GameService = require("../services/game-service");
const GameRecapsService = require("../services/game-recaps-service");
const { PERFORMANCE_THRESHOLDS } = require("../constants/stats-constants");

class GameController {
  static async getGamePlayersStats(req, res) {
    const { gameId } = req.query;
    const gamePlayersStats = await GameService.getGamePlayersStats(gameId);

    res.json(gamePlayersStats);
  }

  static async getGameTopPlayers(req, res) {
    const { gameId } = req.query;
    const playersBoxScore = await GameService.getGamePlayersBoxScore(gameId);
    const topPlayersBoxScore = _.pickBy(playersBoxScore, (playerBoxScore) => {
      return (
        playerBoxScore.DFS >= PERFORMANCE_THRESHOLDS.DFS.GOOD ||
        playerBoxScore.ROTO9 >= PERFORMANCE_THRESHOLDS.ROTO9.GOOD
      );
    });

    const recaps = [];
    for (const [playerName, boxScore] of Object.entries(topPlayersBoxScore)) {
      recaps.push(GameRecapsService.recapGame({ playerName, boxScore }));
    }

    res.json(recaps);
  }
}

module.exports = GameController;
