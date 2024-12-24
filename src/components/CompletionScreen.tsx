import React from "react";
import { WorkoutSummary } from "../types";

interface Props {
  summary: WorkoutSummary;
  onRestart: () => void;
  onReturnMenu: () => void;
}

export function CompletionScreen({ summary, onRestart, onReturnMenu }: Props) {
  return (
    <div style={styles.container}>
      <h1>恭喜完成！ 🎉</h1>
      <p>总耗时：{formatTime(summary.totalTime)}</p>
      {summary.details.map((d, idx) => (
        <div key={idx} style={styles.detail}>
          <strong>{d.exerciseName}</strong> - {d.completedSets} 组 × {d.repsPerSet} 次
        </div>
      ))}
      <div>
        <button style={styles.btn} onClick={onRestart}>
          重新开始
        </button>
        <button style={styles.btn} onClick={onReturnMenu}>
          返回主菜单
        </button>
      </div>
    </div>
  );
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}分${s}秒`;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "1rem",
    textAlign: "center",
  },
  detail: {
    margin: "0.5rem 0",
  },
  btn: {
    backgroundColor: "#CFF6E5",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    margin: "1rem 0.5rem 0 0.5rem",
  },
};
