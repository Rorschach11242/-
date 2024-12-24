import React, { useState } from "react";

interface MiniGameProps {
  onExit: () => void;
}

export function MiniGame({ onExit }: MiniGameProps) {
  const [targetNumber] = useState<number>(() => Math.floor(Math.random() * 10) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const handleGuess = () => {
    if (!guess) return;
    if (Number(guess) === targetNumber) {
      setMessage("恭喜！猜对了！");
    } else {
      setMessage("不对哦，重新试试？");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>猜数字小游戏</h2>
      <p>在 1 ~ 10 之间猜一个数字</p>

      <input
        style={styles.input}
        type="number"
        min={1}
        max={10}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button style={styles.button} onClick={handleGuess}>
        猜一下
      </button>

      {message && <p>{message}</p>}

      <button style={styles.exitBtn} onClick={onExit}>
        返回
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#CFF6E5",
    padding: "1rem",
    borderRadius: "8px",
    textAlign: "center",
  },
  title: {
    marginBottom: "0.5rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  input: {
    width: "60px",
    marginRight: "0.5rem",
  },
  button: {
    backgroundColor: "#FFD5E5",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  exitBtn: {
    backgroundColor: "#FFF6C2",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
};
