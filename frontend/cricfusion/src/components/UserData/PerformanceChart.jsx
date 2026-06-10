import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function PerformanceChart({ data }) {
  return (
    <motion.div
      style={container}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glow */}
      <div style={glowOrb}></div>

      <h3 style={title}>Performance Trend</h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          
          {/* 🔥 Gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00e676" />
              <stop offset="50%" stopColor="#69f0ae" />
              <stop offset="100%" stopColor="#00c853" />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="match"
            tick={{ fill: "#aaa", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#aaa", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
          />

          {/* 🔥 Tooltip */}
          <Tooltip
            contentStyle={{
              background: "rgba(20,20,20,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)"
            }}
            labelStyle={{ color: "#00e676", fontWeight: "600" }}
            itemStyle={{ color: "#fff" }}
            cursor={{
              stroke: "#00e676",
              strokeWidth: 1,
              strokeDasharray: "4 4"
            }}
          />

          {/* 🔥 Line */}
          <Line
            type="monotone"
            dataKey="runs"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={<ActiveDot />}
            isAnimationActive
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

/* ================= CUSTOM DOT ================= */

const CustomDot = (props) => {
  const { cx, cy } = props;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={3}
      fill="#00e676"
      opacity={0.8}
    />
  );
};

/* ================= ACTIVE DOT (PULSE) ================= */

const ActiveDot = (props) => {
  const { cx, cy } = props;

  return (
    <g>
      {/* Outer pulse */}
      <circle cx={cx} cy={cy} r={10} fill="#00e676" opacity={0.15}>
        <animate
          attributeName="r"
          values="6;12;6"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Core */}
      <circle cx={cx} cy={cy} r={5} fill="#00e676" />
    </g>
  );
};

/* ================= STYLES ================= */

const container = {
  position: "relative",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(18px)",
  borderRadius: "20px",
  padding: "20px",
  marginTop: "20px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: `
    0 10px 40px rgba(0,0,0,0.5),
    inset 0 0 10px rgba(255,255,255,0.04)
  `,
  overflow: "hidden"
};

const title = {
  marginBottom: "12px",
  fontSize: "16px",
  fontWeight: "600",
  color: "#e5e7eb"
};

const glowOrb = {
  position: "absolute",
  top: "-50px",
  right: "-50px",
  width: "160px",
  height: "160px",
  background: "radial-gradient(circle, #00e676, transparent)",
  opacity: 0.18,
  filter: "blur(60px)",
  zIndex: 0
};