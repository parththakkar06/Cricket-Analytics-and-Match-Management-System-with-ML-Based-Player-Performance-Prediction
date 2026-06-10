const express = require("express");
const router = express.Router();
const PlayerPerformance = require("../models/PlayerPerformance");

router.get("/:userId", async (req, res) => {
  try {
    const data = await PlayerPerformance.find({
      userId: req.params.userId
    }).sort({ date: 1 });

    const formatted = data.map((d, index) => ({
      match: `M${index + 1}`,
      runs: d.runs
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;