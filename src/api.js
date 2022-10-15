const express = require("express");
const serverless = require("serverless-http");
const SwishController = require("./controllers/swish-controller");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ hello: "world!!!" });
});

router.get("/health", (req, res) => {
  res.json({ state: "healthy!!" });
});

router.get(
  "/add-update-players-basic-info",
  SwishController.addUpdatePlayersBasicInfo
);

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
