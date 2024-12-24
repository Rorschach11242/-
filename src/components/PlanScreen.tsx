import React from "react";
import { WorkoutPlan } from "../types";

interface Props {
  plans: WorkoutPlan[];
  onUpdate: (index: number, field: "sets" | "reps" | "rest", value: number) => void;
  onStart: () => void;
}

export function PlanScreen({ plans, onUpdate, onStart }: Props) {
  function calcEstimatedTime() {
    let totalSeconds = 0;
    plans.forEach((p) => {
      totalSeconds += p.sets * (p.reps * 2);
      totalSeconds += (p.sets - 1) * p.rest;
    });
    return Math.round(totalSeconds);
  }

  const totalTime = calcEstimatedTime();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>调整计划</h1>
      <div style={styles.list}>
        {plans.map((p, i) => (
          <div key={p.exercise.id} style={styles.item}>
            <p>{p.exercise.name}</p>
            <label>
              组数：
              <input
                type="number"
                min={1}
                max={10}
                value={p.sets}
                onChange={(e) => onUpdate(i, "sets", Number(e.target.value))}
              />
            </label>
            <label>
              次数：
              <input
                type="number"
                min={1}
                max={50}
                value={p.reps}
                onChange={(e) => onUpdate(i, "reps", Number(e.target.value))}
              />
            </label>
            <label>
              休息(s)：
              <input
                type="number"
                min={15}
                max={300}
                value={p.rest}
                onChange={(e) => onUpdate(i, "rest", Number(e.target.value))}
              />
            </label>
          </div>
        ))}
      </div>
      <p>预计总时长: {totalTime} 秒</p>
      <button style={styles.startBtn} onClick={onStart}>
        开始运动
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "1rem",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1rem",
  },
  item: {
    backgroundColor: "#FFF6C2",
    padding: "0.5rem",
    borderRadius: "8px",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  startBtn: {
    display: "block",
    margin: "1rem auto 0",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    backgroundColor: "#FFD5E5",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};
