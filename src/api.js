const express = require("express");
const fetch = require("node-fetch");
const serverless = require("serverless-http");
const SwishController = require("./controllers/swish-controller");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ hello: "express-netlify" });
});

router.get("/health", (req, res) => {
  res.json({ state: "healthy!!!" });
});

router.get("/webhook", (req, res) => {
  const everything = req.body;
  res.json({ state: !!req.body, ...everything });
});

router.post("/webhook1", async (req, res) => {
  const everything = req.body;
  const url =
    "https://tubular-blini-69c554.netlify.app/.netlify/functions/api/webhook2";
  response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(everything || { inside: "nothing" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  res.json({ state: !!req.body, ...everything });
});

router.get("/webhook2", (req, res) => {
  const everything = req.body;
  res.json({ state: !!req.body, ...everything });
});

router.get(
  "/add-update-players-basic-info",
  SwishController.addUpdatePlayersBasicInfo
);
router.post(
  "/add-update-players-basic-info",
  SwishController.addUpdatePlayersBasicInfo
);

router.get("/add-daily-game-logs", SwishController.addDailyGameLogs);
router.post("/add-daily-game-logs", SwishController.addDailyGameLogs);

router.get(
  "/calculate-period-averages",
  SwishController.calculatePeriodAverages
);
router.post(
  "/calculate-period-averages",
  SwishController.calculatePeriodAverages
);

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
