// src/App.tsx
import React, { useState } from "react";
import { useWorkout } from "./hooks/useWorkout";
import { ExerciseSelection } from "./components/ExerciseSelection";
import { PlanScreen } from "./components/PlanScreen";
import { ProgressScreen } from "./components/ProgressScreen";
import { CompletionScreen } from "./components/CompletionScreen";

// 简单的确认对话框
function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div style={dialogStyles.overlay}>
      <div style={dialogStyles.box}>
        <p>{message}</p>
        <button style={dialogStyles.btn} onClick={onConfirm}>
          确定
        </button>
        <button style={dialogStyles.btn} onClick={onCancel}>
          取消
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const {
    screen,
    setScreen,
    selectedExercises,
    toggleExercise,
    createPlan,
    workoutPlans,
    updatePlan,
    progress,
    setProgress,
    startWorkout,
    completeSet,
    summary,
  } = useWorkout();

  // 控制是否显示“返回确认框”
  const [showConfirm, setShowConfirm] = useState(false);

  const handleExitConfirm = () => {
    setShowConfirm(true);
  };
  const confirmExit = () => {
    setShowConfirm(false);
    setScreen("selection");
  };
  const cancelExit = () => {
    setShowConfirm(false);
  };
  const handleRestart = () => {
    setScreen("selection");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      {screen === "selection" && (
        <ExerciseSelection
          selectedIds={selectedExercises}
          toggleExercise={toggleExercise}
          onNext={createPlan}
        />
      )}
      {screen === "plan" && (
        <PlanScreen
          plans={workoutPlans}
          onUpdate={updatePlan}
          onStart={startWorkout}
        />
      )}
      {screen === "progress" && (
        <ProgressScreen
          plans={workoutPlans}
          progress={progress}
          setProgress={setProgress}
          onCompleteSet={completeSet}
          onExitConfirm={handleExitConfirm}
        />
      )}
      {screen === "completion" && summary && (
        <CompletionScreen
          summary={summary}
          onRestart={handleRestart}
          onReturnMenu={() => setScreen("selection")}
        />
      )}
      {showConfirm && (
        <ConfirmDialog
          message="确定要退出吗？将丢失当前进度。"
          onConfirm={confirmExit}
          onCancel={cancelExit}
        />
      )}
    </div>
  );
}

const dialogStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    minWidth: "200px",
    textAlign: "center",
  },
  btn: {
    margin: "0 0.5rem",
    backgroundColor: "#E8F8FF",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
  },
};
