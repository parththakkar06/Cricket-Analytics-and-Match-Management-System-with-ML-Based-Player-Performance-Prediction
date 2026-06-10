import { useEffect, useState } from "react";
import axios from "axios";
import PerformanceChart from "./PerformanceChart";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function InsightsDashboard({ userId }) {
  const [chartData, setChartData] = useState([]);
  const [prediction, setPrediction] = useState(0);
  const [lastMatch, setLastMatch] = useState(0);
  const [avg, setAvg] = useState(0);
  const [consistency, setConsistency] = useState(0);
  const [trend, setTrend] = useState("stable");
  const [rating, setRating] = useState(0);
  console.log("UserID:", userId);
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3002/api/performance/${userId}`
        );
    
        const data = res.data || [];
        console.log(data)
        setChartData(data);

        if (data.length < 3) return;

        const runs = data.map(d => d.runs || 0);
        const last5 = runs.slice(-5);

        const avgRuns =
          last5.reduce((a, b) => a + b, 0) / last5.length;

        const variance =
          last5.reduce((sum, r) => sum + Math.pow(r - avgRuns, 2), 0) /
          last5.length;

        const stdDev = Math.sqrt(variance);

        const last = last5[last5.length - 1];

        const trendVal =
          last5[last5.length - 1] > last5[0]
            ? "improving"
            : last5[last5.length - 1] < last5[0]
            ? "declining"
            : "stable";

        // Prediction
        const weights = [1, 2, 3, 4, 5];
        let weightedSum = 0;

        last5.forEach((r, i) => {
          weightedSum += r * weights[i];
        });

        let pred =
          weightedSum / weights.reduce((a, b) => a + b, 0);

        if (trendVal === "improving") pred += 5;
        if (trendVal === "declining") pred -= 5;

        pred = Math.max(0, Math.round(pred));

        // Rating
        const playerRating = Math.min(
          100,
          Math.round(avgRuns * 1.5 - stdDev)
        );

        setPrediction(pred);
        setLastMatch(last);
        setAvg(avgRuns.toFixed(1));
        setConsistency(stdDev.toFixed(1));
        setTrend(trendVal);
        setRating(playerRating);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userId]);

  const diff = prediction - lastMatch;

  const comparisonData = [
    { name: "Last", runs: lastMatch },
    { name: "Predicted", runs: prediction }
  ];

  return (
    <div style={container}>
      <h2 style={title}>Player Analytics</h2>

      {/* METRICS */}
      <div style={grid}>
        <Metric title="Average" value={avg} />
        <Metric title="Consistency" value={consistency} />
        <Metric title="Trend" value={trend} highlight={trend === "improving"} />
        <Metric title="Rating" value={`${rating}/100`} highlight />
      </div>

      {/* LINE CHART */}
      <section style={section}>
        <PerformanceChart data={chartData} />
      </section>

      {/* BAR CHART */}
      <section style={section}>
        <div style={chartCard}>
          <h3 style={sectionTitle}>Prediction vs Actual</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="runs" fill="#00e676" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* CONSISTENCY VISUAL */}
      <section style={section}>
        <div style={chartCard}>
          <h3 style={sectionTitle}>Consistency Level</h3>

          <div style={consistencyBarWrapper}>
            <div
              style={{
                ...consistencyBar,
                width: `${Math.min(100, consistency * 2)}%`
              }}
            />
          </div>

          <p style={subText}>
            Standard Deviation: {consistency}
          </p>
        </div>
      </section>

      {/* PREDICTION */}
      <section style={section}>
        <motion.div
          style={predictionBox}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 style={sectionTitle}>Next Match Prediction</h3>

          <div style={predictionMain}>
            {prediction}
            <span style={runsText}>runs</span>
          </div>

          <p style={subText}>
            Last Match: {lastMatch} →{" "}
            <span style={{ color: diff >= 0 ? "#00e676" : "#ff5252" }}>
              {diff >= 0 ? "+" : ""}
              {diff}
            </span>
          </p>

          <p style={note}>Based on last 5 matches</p>
        </motion.div>
      </section>

      {/* INSIGHTS */}
      <section style={section}>
        <div style={insightBox}>
          <h3 style={sectionTitle}>Insights</h3>

          {trend === "improving" && (
            <p style={{ color: "#00e676" }}>📈 Form improving</p>
          )}

          {consistency > 20 && (
            <p style={{ color: "#facc15" }}>⚠️ Inconsistent</p>
          )}

          {avg > 40 && (
            <p style={{ color: "#00e676" }}>🔥 Strong scoring</p>
          )}

          {lastMatch < 20 && (
            <p style={{ color: "#ff5252" }}>🚨 Poor last match</p>
          )}
        </div>
      </section>
    </div>
  );
}

/* COMPONENT */

const Metric = ({ title, value, highlight }) => (
  <motion.div
    style={{
      ...card,
      ...(highlight && highlightCard)
    }}
    whileHover={{ scale: 1.05 }}
  >
    <p style={cardTitle}>{title}</p>
    <h2 style={cardValue}>{value}</h2>
  </motion.div>
);

/* STYLES */

const container = {
  padding: "40px",
  background: "#0f172a",
  minHeight: "100vh"
};

const title = {
  color: "#fff",
  marginBottom: "24px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  marginBottom: "24px"
};

const section = {
  marginBottom: "24px"
};

const chartCard = {
  background: "rgba(255,255,255,0.06)",
  padding: "20px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.1)"
};

const card = {
  background: "rgba(255,255,255,0.06)",
  padding: "20px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.1)"
};

const highlightCard = {
  border: "1px solid #00e676"
};

const cardTitle = {
  color: "#94a3b8",
  fontSize: "13px"
};

const cardValue = {
  color: "#fff",
  fontSize: "24px"
};

const sectionTitle = {
  color: "#fff",
  marginBottom: "10px"
};

const consistencyBarWrapper = {
  height: "10px",
  background: "#1e293b",
  borderRadius: "10px"
};

const consistencyBar = {
  height: "100%",
  background: "#00e676",
  borderRadius: "10px"
};

const predictionBox = {
  padding: "20px",
  background: "rgba(0,230,118,0.1)",
  borderRadius: "14px"
};

const predictionMain = {
  fontSize: "42px",
  color: "#fff"
};

const runsText = {
  fontSize: "16px",
  marginLeft: "6px"
};

const subText = {
  color: "#94a3b8",
  marginTop: "10px"
};

const note = {
  fontSize: "12px",
  color: "#64748b"
};

const insightBox = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "14px"
};