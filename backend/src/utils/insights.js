// src/utils/insights.js

exports.generateInsights = (performances) => {

    if (!performances || performances.length < 3) {
      return {
        message: "Not enough data"
      };
    }
  
    // ---------- averages ----------
    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  
    const runsArray = performances.map(p => p.runs);
  
    const overallAvg = avg(runsArray);
  
    const last5 = performances.slice(-5);
    const last5Avg = avg(last5.map(p => p.runs));
  
    // ---------- trend ----------
    const trend =
      last5[last5.length - 1].runs -
      last5[0].runs;
  
    let trendFactor = 0;
  
    if (trend > 0) trendFactor = 5;
    if (trend < 0) trendFactor = -5;
  
    // ---------- prediction ----------
    const predictedRuns = Math.round(
      (0.5 * last5Avg) +
      (0.3 * overallAvg) +
      (0.2 * trendFactor)
    );
  
    // ---------- weakness ----------
    const dismissals = performances.filter(p => p.dismissalType !== "notout");
  
    const spinDismissals = dismissals.filter(
      d => d.bowlerType === "spin"
    ).length;
  
    let weakness = "No clear weakness";
  
    if (dismissals.length > 0) {
      const percent = Math.round((spinDismissals / dismissals.length) * 100);
  
      if (percent > 50) {
        weakness = `Struggles against spin (${percent}%)`;
      }
    }
  
    // ---------- confidence ----------
let confidence = "Low";

if (performances.length >= 8) confidence = "High";
else if (performances.length >= 5) confidence = "Medium";

// ---------- form ----------
let form = "Stable";

const diff = last5Avg - overallAvg;

if (diff >= 5) form = "🔥 Improving";
else if (diff <= -5) form = "📉 Declining";
// ---------- explanation ----------
const explanation = `Based on last ${performances.length} matches, player averages ${Math.round(overallAvg)} runs and is currently ${form.toLowerCase()}.`;

// ---------- batting position analysis ----------
const positionMap = {};

performances.forEach(p => {
  if (!positionMap[p.battingPosition]) {
    positionMap[p.battingPosition] = [];
  }
  positionMap[p.battingPosition].push(p.runs);
});

let bestPosition = null;
let bestAvg = 0;

for (let pos in positionMap) {
  const runs = positionMap[pos];
  const avgRuns = runs.reduce((a, b) => a + b, 0) / runs.length;

  if (avgRuns > bestAvg) {
    bestAvg = avgRuns;
    bestPosition = pos;
  }
}

return {
  bestPosition: Number(bestPosition),  
  predictedRuns,
  weakness,
  confidence,
  form,
  explanation
};
  };