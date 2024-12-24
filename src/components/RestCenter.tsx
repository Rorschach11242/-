import React, { useState } from "react";
import { MiniGame } from "./MiniGame";
import { TipsView } from "./TipsView";

interface RestCenterProps {
  onSkipRest: () => void;
  restTimeLeft: number;
  onExitConfirm: () => void;
}

type ViewMode = "menu" | "game" | "tips";

export function RestCenter({ onSkipRest, restTimeLeft, onExitConfirm }: RestCenterProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("menu");

  const handleBackToMenu = () => {
    setViewMode("menu");
  };

  let content;
  if (viewMode === "menu") {
    content = (
      <div style={styles.menuContainer}>
        <h2>休息中...</h2>
        <p style={{ fontSize: "1.5rem" }}>{restTimeLeft} 秒</p>
        <button style={styles.btn} onClick={() => setViewMode("game")}>玩小游戏</button>
        <button style={styles.btn} onClick={() => setViewMode("tips")}>学习Tips</button>
        <button style={styles.btn} onClick={onSkipRest}>跳过休息</button>
      </div>
    );
  } else if (viewMode === "game") {
    content = <MiniGame onExit={handleBackToMenu} />;
  } else {
    content = <TipsView onExit={handleBackToMenu} />;
  }

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={onExitConfirm}>
        返回
      </button>
      {content}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    padding: "1rem",
    textAlign: "center",
    minHeight: "100vh",
  },
  menuContainer: {
    backgroundColor: "#FFF6C2",
    padding: "1rem",
    borderRadius: "8px",
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
