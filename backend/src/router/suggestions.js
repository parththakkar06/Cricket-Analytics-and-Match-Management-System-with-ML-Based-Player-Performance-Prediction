const express = require("express");
const router = express.Router();
const PlayerPerformance = require("../models/PlayerPerformance");

router.get("/:userId", async (req, res) => {
  try {
    const data = await PlayerPerformance.find({
      userId: req.params.userId
    }).sort({ date: 1 });

    if (!data.length) {
      return res.json({
        suggestions: [],
        stats: null
      });
    }

    const runsArray = data.map(d => d.runs);

    const avg =
      runsArray.reduce((sum, r) => sum + r, 0) / runsArray.length;

    const variance =
      runsArray.reduce((sum, r) => sum + Math.pow(r - avg, 2), 0) /
      runsArray.length;

    const consistency = Math.sqrt(variance);

    const trend =
      runsArray[runsArray.length - 1] > runsArray[0]
        ? "improving"
        : runsArray[runsArray.length - 1] < runsArray[0]
        ? "declining"
        : "stable";

    const suggestions = [];

    if (consistency > 20) {
      suggestions.push("⚠️ High inconsistency detected");
    }

    if (trend === "declining") {
      suggestions.push("📉 Performance dropping — needs focus");
    }

    if (trend === "improving") {
      suggestions.push("📈 Performance improving");
    }

    res.json({
      stats: {
        avg: avg.toFixed(1),
        consistency: consistency.toFixed(2),
        trend
      },
      suggestions
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;