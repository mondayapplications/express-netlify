const _ = require("lodash");
const EspnApiClient = require("./espn-api-client");
const SerializationService = require("./serialization-service");

class GameService {
  static async getGamesByDate(year, month, day) {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 1);
    const defaultYear = dateObj.getUTCFullYear();
    const defaultMonth = dateObj.getUTCMonth() + 1; //months from 1-12
    const defaultDay = dateObj.getUTCDate();

    const scoreboard = await EspnApiClient.getScoreboard(
      year || defaultYear,
      month || defaultMonth,
      day || defaultDay
    );
    return scoreboard.events;
  }

  static async getGamePlayersBoxScore(gameId) {
    const gameBoxscore = await EspnApiClient.getBoxScore(gameId);
    const gamePlayersBoxScore = {};

    const { players } = gameBoxscore;
    const awayTeamIndex = 0;
    let oppIndex = 1;
    for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
      const court = teamIndex === awayTeamIndex ? "A" : "H";
      const result = getGameResultByTeam(players[teamIndex], players[oppIndex]);
      const team = players[teamIndex].team.abbreviation;
      const opp = players[oppIndex].team.abbreviation;

      const teamPlayers = players[teamIndex].statistics[0].athletes;
      for (const player of teamPlayers) {
        const playerBoxScore = getGamePlayerBoxScore(player);
        const playerId = player.athlete.id;
        const gp = 1;

        gamePlayersBoxScore[playerId] = SerializationService.serializeGameLog({
          playerId,
          court,
          result,
          team,
          opp,
          gp,
          ...playerBoxScore,
        });
      }
      oppIndex--;
    }

    return gamePlayersBoxScore;
  }
}

function getGamePlayerBoxScore(player) {
  if (_.size(player.stats) > 0) {
    const min = parseInt(player.stats[0]);
    const fgs = player.stats[1]?.split("-");
    const fgm = parseInt(fgs[0]);
    const fga = parseInt(fgs[1]);
    const fgpct = fga > 0 ? fgm / fga : 0;
    const tps = player.stats[2]?.split("-");
    const tpm = parseInt(tps[0]);
    const tpa = parseInt(tps[1]);
    const tppct = tpa > 0 ? tpm / tpa : 0;
    const fts = player.stats[3]?.split("-");
    const ftm = parseInt(fts[0]);
    const fta = parseInt(fts[1]);
    const ftpct = fta > 0 ? ftm / fta : 0;
    const oreb = parseInt(player.stats[4]);
    const dreb = parseInt(player.stats[5]);
    const treb = parseInt(player.stats[6]);
    const ast = parseInt(player.stats[7]);
    const stl = parseInt(player.stats[8]);
    const blk = parseInt(player.stats[9]);
    const tov = parseInt(player.stats[10]);
    const pts = parseInt(player.stats[13]);

    return {
      min,
      fgm,
      fga,
      fgpct,
      tpm,
      tpa,
      tppct,
      ftm,
      fta,
      ftpct,
      oreb,
      dreb,
      treb,
      ast,
      stl,
      blk,
      tov,
      pts,
    };
  }
}

function getGameResultByTeam(team, oppTeam) {
  const teamScore = parseInt(team.statistics[0].totals[13]);
  const oppTeamScore = parseInt(oppTeam.statistics[0].totals[13]);
  return teamScore > oppTeamScore ? "W" : "L";
}

module.exports = GameService;
