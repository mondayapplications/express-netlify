const _ = require("lodash");
const sdv = require("sportsdataverse");

class ScheduleService {
  static async getGamesByDate(year, month, day) {
    const scoreboard = await sdv.nba.getScoreboard({ year, month, day });
    return getGamesFromScoreboard(scoreboard);
  }

  static async getEndedGamesByDate(year, month, day) {
    const games = await this.getGamesByDate(year, month, day);
    return _.filter(games, (game) =>
      _.get(game, "status.type.completed", false)
    );
  }

  static async getNonEndedGamesByDate(year, month, day) {
    const games = await this.getGamesByDate(year, month, day);
    const endedGames = await this.getEndedGamesByDate(year, month, day);
    const endedGameIds = _.map(endedGames, (game) => game.id);
    return _.filter(games, (game) => !endedGameIds.includes(game.id));
  }
}

function getGamesFromScoreboard(scoreboard) {
  return _.get(scoreboard, "events", []);
}

module.exports = ScheduleService;
