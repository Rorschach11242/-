import React, { useState } from "react";

const tipsData = [
  {
    title: "深蹲注意事项",
    content: "保持背部挺直，膝盖方向与脚尖平行，重心在脚后跟。",
  },
  {
    title: "俯卧撑要点",
    content: "身体保持一直线，下放时胸部接近地面，避免塌腰或撅屁股。",
  },
  {
    title: "平板支撑技巧",
    content: "核心收紧，头、肩、臀、脚跟在一条直线上，避免塌腰或耸肩。",
  },
];

interface TipsViewProps {
  onExit: () => void;
}

export function TipsView({ onExit }: TipsViewProps) {
  const [index, setIndex] = useState(0);
  const currentTip = tipsData[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % tipsData.length);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{currentTip.title}</h2>
      <p style={styles.content}>{currentTip.content}</p>

      <div style={styles.buttonRow}>
        <button style={styles.btn} onClick={handleNext}>
          下一条
        </button>
        <button style={styles.btn} onClick={onExit}>
          返回
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#E8F8FF",
    padding: "1rem",
    borderRadius: "8px",
    textAlign: "center",
  },
  title: {
    marginBottom: "0.5rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  content: {
    marginBottom: "0.5rem",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  btn: {
    backgroundColor: "#FFD5E5",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
  },
};
