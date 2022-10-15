const _ = require("lodash");
const ScheduleService = require("../services/schedule-service");

class ScheduleController {
  static async getEndedGames(req, res) {
    const { date } = req.query;
    const { year, month, day } = parseDateInput(date);
    const games = await ScheduleService.getEndedGamesByDate(year, month, day);
    const gameIds = _.map(games, (game) => game.id);
    res.json(gameIds);
  }

  static async getNonEndedGames(req, res) {
    const { date } = req.query;
    const { year, month, day } = parseDateInput(date);
    const games = await ScheduleService.getNonEndedGamesByDate(
      year,
      month,
      day
    );
    const gameIds = _.map(games, (game) => game.id);
    res.json(gameIds);
  }
}

function parseDateInput(dateString) {
  const dateParts = _.split(dateString, "-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  return { year, month, day };
}
module.exports = ScheduleController;
