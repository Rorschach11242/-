import React from "react";
import { exercises } from "../data/exercises";

interface Props {
  selectedIds: string[];
  toggleExercise: (id: string) => void;
  onNext: () => void;
}

export function ExerciseSelection({ selectedIds, toggleExercise, onNext }: Props) {
  const canNext = selectedIds.length > 0;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>选择动作</h1>
      <div style={styles.grid}>
        {exercises.map((ex) => {
          const selected = selectedIds.includes(ex.id);
          return (
            <div
              key={ex.id}
              style={{
                ...styles.card,
                ...(selected ? styles.cardSelected : {}),
              }}
              onClick={() => toggleExercise(ex.id)}
            >
              <h2>{ex.name}</h2>
              {selected && <span style={styles.checkmark}>✓</span>}
            </div>
          );
        })}
      </div>
      <button
        onClick={onNext}
        disabled={!canNext}
        style={canNext ? styles.nextBtn : styles.nextBtnDisabled}
      >
        下一步
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
  grid: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: "120px",
    height: "120px",
    borderRadius: "10px",
    backgroundColor: "#E8F8FF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  },
  cardSelected: {
    transform: "scale(1.05)",
    backgroundColor: "#CFF6E5",
  },
  checkmark: {
    position: "absolute",
    top: "8px",
    right: "8px",
    fontSize: "1.5rem",
  },
  nextBtn: {
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
  nextBtnDisabled: {
    display: "block",
    margin: "1rem auto 0",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    backgroundColor: "grey",
    border: "none",
    cursor: "not-allowed",
  },
};
