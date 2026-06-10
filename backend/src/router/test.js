const express = require("express");
const router = express.Router();
const PlayerPerformance = require("../models/PlayerPerformance");

router.get("/bulk-insert", async (req, res) => {
  try {

    const userId = "69b4fd36a601f2f80e87b0a5";
    const matchId = "69b44dc6a601f2f80e87b03a";

    const data = await PlayerPerformance.insertMany([
      {
        userId,
        matchId,
        runs: 10,
        balls: 8,
        dismissalType: "bowled",
        bowlerType: "spin",
        battingPosition: 1,
        zones: []
      },
      {
        userId,
        matchId,
        runs: 35,
        balls: 25,
        dismissalType: "caught",
        bowlerType: "fast",
        battingPosition: 2,
        zones: []
      },
      {
        userId,
        matchId,
        runs: 50,
        balls: 30,
        dismissalType: "caught",
        bowlerType: "spin",
        battingPosition: 3,
        zones: []
      },
      {
        userId,
        matchId,
        runs: 5,
        balls: 10,
        dismissalType: "lbw",
        bowlerType: "spin",
        battingPosition: 1,
        zones: []
      },
      {
        userId,
        matchId,
        runs: 60,
        balls: 40,
        dismissalType: "notout",
        bowlerType: "fast",
        battingPosition: 3,
        zones: []
      }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/insert-test", async (req, res) => {
  try {
    const data = await PlayerPerformance.create({
      userId: "69b44a53a601f2f80e87aff1",
      matchId: "69b44dc6a601f2f80e87b03a",
      runs: 10,
      balls: 5,
      dismissalType: "bowled",
      bowlerType: "fast",
      battingPosition: 1,
      zones: []
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const { generateInsights } = require("../utils/insights");

router.get("/test-insight/:userId", async (req, res) => {

  const data = await PlayerPerformance.find({
    userId: req.params.userId
  });

  const insights = generateInsights(data);

  res.json(insights);
});

module.exports = router;