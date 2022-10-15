const _ = require("lodash");
const express = require("express");
const router = express.Router();
const ScheduleController = require("../controllers/schedule-controller");
const GameController = require("../controllers/game-controller");
const TeamController = require("../controllers/team-controller");
const PlayerController = require("../controllers/player-controller");
// const BasketballReferenceController = require("../controllers/basketball-reference-controller");
const SwishController = require("../controllers/swish-controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/health", function (req, res, next) {
  res.json("healthy");
});

router.get("/get-ended-games", ScheduleController.getEndedGames);
router.get("/get-non-ended-games", ScheduleController.getNonEndedGames);
router.get("/get-game-top-players", GameController.getGameTopPlayers);
router.get("/get-game-players-stats", GameController.getGamePlayersStats);
router.get("/get-team-players", TeamController.getTeamPlayers);
router.get("/get-player", PlayerController.getPlayer);
// router.get("/get-team-players", BasketballReferenceController.getTeamPlayers);
// router.get("/get-daily-leaders", BasketballReferenceController.getDailyLeaders);
router.get(
  "/add-update-players-basic-info",
  SwishController.addUpdatePlayersBasicInfo
);

// router.get("/pbp", getGame);

// async function getEndedGames(req, res) {
//   // const gameId = 401360016;
//   // const result = await GameService.gatPlayersBoxScoreFromGame(gameId);
//   // const result = await GameService.getGamesByDate(2021, 11, 18);
//   // res.json(result);
//   // const playerKey = "Anthony Davis";
//   // const anthonyDavis = result[playerKey];
//   // const message =
//   //   playerKey +
//   //   " had a great game finishing with: " +
//   //   JSON.stringify(anthonyDavis);
//   // await TwitterService.write(message);
//   // res.json(result);
//   // res.json(message);
// }

module.exports = router;
