const _ = require("lodash");
const sdv = require("sportsdataverse");
const StatsCalculationService = require("./stats-calculation-service");
const StatsParserService = require("./stats-parser-service");

class GameService {
  static async getGamePlayersStats(gameId) {
    const gamePlayByPLay = await gatGamePlayByPLay(gameId);
    const gameAthletes = getGameAthletes(gamePlayByPLay);
    const statsCategories = getStatsCategories(gamePlayByPLay);
    const gamePlayersStats = {};
    let teamIndex = 0;
    let oppIndex = 1;
    for (const teamAthletes of gameAthletes) {
      const court = gamePlayByPLay.teams[teamIndex].homeAway
        .substring(0, 1)
        .toUpperCase();

      const result = gamePlayByPLay.teams[teamIndex].winner ? "W" : "L";
      const team = gamePlayByPLay.teams[teamIndex].team.abbreviation;
      const opp = gamePlayByPLay.teams[oppIndex].team.abbreviation;
      for (const athlete of teamAthletes) {
        const playerBoxScore = gatGamePlayerBoxScore(athlete, statsCategories);
        const playerId = athlete.athlete.id;
        const playerKey = playerId;

        gamePlayersStats[playerKey] = {
          playerId,
          team,
          court,
          opp,
          gp: 1,
          result,
          min: playerBoxScore.MIN,
          fgm: playerBoxScore.FGM,
          fga: playerBoxScore.FGA,
          fgpct: playerBoxScore.FGP,
          tpm: playerBoxScore["3PTM"],
          tpa: playerBoxScore["3PTA"],
          tppct: playerBoxScore["3PTP"],
          ftm: playerBoxScore.FTM,
          fta: playerBoxScore.FTA,
          ftpct: playerBoxScore.FTP,
          oreb: playerBoxScore.OREB,
          dreb: playerBoxScore.DREB,
          treb: playerBoxScore.REB,
          ast: playerBoxScore.AST,
          stl: playerBoxScore.STL,
          blk: playerBoxScore.BLK,
          tov: playerBoxScore.TOV,
          pts: playerBoxScore.PTS,
        };
      }
      teamIndex++;
      oppIndex--;
    }

    return gamePlayersStats;
  }

  static async getGamePlayersBoxScore(gameId) {
    const gamePlayByPLay = await gatGamePlayByPLay(gameId);
    const gameAthletes = getGameAthletes(gamePlayByPLay);
    const statsCategories = getStatsCategories(gamePlayByPLay);
    let results = {};
    for (const teamAthletes of gameAthletes) {
      for (const athlete of teamAthletes) {
        const playerBoxScore = gatGamePlayerBoxScore(athlete, statsCategories);
        const playerName = athlete.athlete.displayName;
        const playerKey = playerName;
        results = {
          ...results,
          [playerKey]: playerBoxScore,
        };
      }
    }
    return results;
  }
}

async function gatGamePlayByPLay(gameId) {
  return await sdv.nba.getPlayByPlay(gameId);
}
function gatGamePlayerBoxScore(athlete, categories) {
  const values = athlete.stats;
  const playerBoxScore = StatsParserService.parsePlayerBoxScore(
    categories,
    values
  );

  playerBoxScore.DFS = StatsCalculationService.calculateDFS(categories, values);
  playerBoxScore.ROTO8 = StatsCalculationService.calculateRoto8Cat(
    categories,
    values
  );
  playerBoxScore.ROTO9 = StatsCalculationService.calculateRoto9Cat(
    categories,
    values
  );
  return playerBoxScore;
}
function getStatsCategories(gamePlayByPLay) {
  return _.get(gamePlayByPLay, "boxScore.players[0].statistics[0].names");
}

function getGameAthletes(gamePlayByPLay) {
  const result = [];
  result.push(
    _.get(gamePlayByPLay, "boxScore.players[0].statistics[0].athletes")
  );
  result.push(
    _.get(gamePlayByPLay, "boxScore.players[1].statistics[0].athletes")
  );
  return result;
}

module.exports = GameService;
