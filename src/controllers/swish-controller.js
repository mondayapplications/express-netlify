const TeamService = require("../services/team-service");
const SwishService = require("../services/swish-service");
const GameService = require("../services/game-service");

class SwishController {
  static async addUpdatePlayersBasicInfo(req, res) {
    try {
      const { debugMode } = req.query;

      let players = {};
      const teams = await TeamService.getTeams();
      for (const { team } of teams) {
        const { id: teamId } = team;
        const teamPlayers = await TeamService.getTeamPlayers(teamId);

        for (const player of teamPlayers) {
          players[player.id] = player;
        }
      }

      const result = await SwishService.addUpdatePlayersBasicInfo(players, {
        debugMode,
      });
      res.json(result);
    } catch (error) {
      res.json(error);
      console.log("--------this is my error----------", error);
    }
  }

  static async addDailyGameLogs(req, res) {
    try {
      const { debugMode, year, month, day } = req.query;

      const dailyGameLogs = {};
      const games = await GameService.getGamesByDate(year, month, day);

      for (const game of games) {
        const { id: gameId } = game;
        const gamePlayersBoxScore = await GameService.getGamePlayersBoxScore(
          gameId
        );

        console.log("-----------gamePlayersBoxScore", gamePlayersBoxScore);
        const gamePlayersBoxScoreArr = Object.values(gamePlayersBoxScore);

        for (const playerBoxScore of gamePlayersBoxScoreArr) {
          dailyGameLogs[playerBoxScore.playerId] = playerBoxScore;
        }
      }

      const result = await SwishService.addDailyGameLogs(dailyGameLogs, {
        debugMode,
      });
      res.json(result);
    } catch (error) {
      res.json(error);
      console.log("--------this is my error----------", error);
    }
  }
}

module.exports = SwishController;
