const express = require("express");
const axios = require("axios");
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

async function handleWebhook1(req, res) {
  const everything = req.body;
  const baseUrl =
    "https://tubular-blini-69c554.netlify.app/.netlify/functions/api/webhook2";

  const params = {
    enable: "roster",
    everything,
  };
  const response = await axios.get(baseUrl, {
    params,
  });

  res.json({ response: !!response.data, ...everything });
}

router.post("/webhook1", handleWebhook1);

router.get("/webhook2", (req, res) => {
  const everything = req.query;
  const everything2 = req.params;
  res.json({ state: !!req.query, everything, everything2 });
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
