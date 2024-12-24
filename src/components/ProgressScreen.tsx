import React, { useState, useEffect } from "react";
import { WorkoutPlan, WorkoutProgress } from "../types";
import { RestCenter } from "./RestCenter";
import { motion } from "framer-motion";

interface ProgressScreenProps {
  plans: WorkoutPlan[];
  progress: WorkoutProgress;
  setProgress: React.Dispatch<React.SetStateAction<WorkoutProgress>>;
  onCompleteSet: () => void;
  onExitConfirm: () => void;
}

export function ProgressScreen({
  plans,
  progress,
  setProgress,
  onCompleteSet,
  onExitConfirm,
}: ProgressScreenProps) {
  const currentPlan = plans[progress.currentExerciseIndex];
  const totalExercises = plans.length;
  const { currentSet, isResting, elapsedTime } = progress;

  // 假设每动作restTime都一样，也可以改成按当前Plan
  const [restTimeLeft, setRestTimeLeft] = useState(currentPlan.rest);

  const [currentCount, setCurrentCount] = useState(1);

  // 累加 elapsedTime
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => ({ ...p, elapsedTime: p.elapsedTime + 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, [setProgress]);

  // 动作计数
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isResting) {
      interval = setInterval(() => {
        setCurrentCount((c) => (c < currentPlan.reps ? c + 1 : c));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isResting, currentPlan.reps]);

  // 点击加速
  const handleAccelerate = () => {
    if (!isResting) {
      setCurrentCount((c) => (c < currentPlan.reps ? c + 1 : c));
    }
  };

  // 倒计时
  useEffect(() => {
    let restInterval: NodeJS.Timeout | null = null;
    if (isResting) {
      setRestTimeLeft(currentPlan.rest);
      restInterval = setInterval(() => {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            skipRest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (restInterval) clearInterval(restInterval);
    };
  }, [isResting, currentPlan.rest]);

  function skipRest() {
    setProgress((p) => ({ ...p, isResting: false }));
  }

  // 若在休息
  if (isResting) {
    return (
      <RestCenter
        onSkipRest={skipRest}
        restTimeLeft={restTimeLeft}
        onExitConfirm={onExitConfirm}
      />
    );
  }

  // 否则渲染运动界面
  return (
    <motion.div
      style={styles.container}
      onClick={handleAccelerate}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <button style={styles.backBtn} onClick={onExitConfirm}>
        返回
      </button>
      <h2>
        {currentPlan.exercise.name} - 第 {currentSet} 组 / 共{" "}
        {currentPlan.sets} 组
      </h2>
      <p>动作计数: {currentCount} / {currentPlan.reps}</p>
      <p style={styles.smallText}>(点击屏幕加速数字增长)</p>

      <button style={styles.btn} onClick={onCompleteSet}>
        完成本组
      </button>
    </motion.div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "1rem",
    textAlign: "center",
    position: "relative",
    minHeight: "100vh",
  },
  smallText: {
    fontSize: "0.9rem",
    color: "#777",
  },
  btn: {
    backgroundColor: "#FFD5E5",
    border: "none",
    borderRadius: "8px",
    padding: "10px 16px",
    cursor: "pointer",
    margin: "0.5rem",
  },
  backBtn: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    backgroundColor: "#E8F8FF",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
