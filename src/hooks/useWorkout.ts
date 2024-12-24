import { useState } from "react";
import { Exercise, WorkoutPlan, WorkoutProgress, WorkoutSummary } from "../types";
import { exercises } from "../data/exercises";

type ScreenType = "selection" | "plan" | "progress" | "completion";

export function useWorkout() {
  const [screen, setScreen] = useState<ScreenType>("selection");
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [progress, setProgress] = useState<WorkoutProgress>({
    currentExerciseIndex: 0,
    currentSet: 1,
    isResting: false,
    elapsedTime: 0,
  });
  const [summary, setSummary] = useState<WorkoutSummary | null>(null);

  function toggleExercise(exerciseId: string) {
    setSelectedExercises((prev) => {
      if (prev.includes(exerciseId)) {
        return prev.filter((id) => id !== exerciseId);
      }
      return [...prev, exerciseId];
    });
  }

  function createPlan() {
    const plans = selectedExercises.map((id) => {
      const ex = exercises.find((e) => e.id === id)!;
      return {
        exercise: ex,
        sets: ex.defaultSets,
        reps: ex.defaultReps,
        rest: ex.defaultRest,
      };
    });
    setWorkoutPlans(plans);
    setScreen("plan");
  }

  function updatePlan(index: number, field: "sets" | "reps" | "rest", value: number) {
    setWorkoutPlans((prev) => {
      const updated = [...prev];
      (updated[index] as any)[field] = value;
      return updated;
    });
  }

  function startWorkout() {
    setScreen("progress");
    setProgress({
      currentExerciseIndex: 0,
      currentSet: 1,
      isResting: false,
      elapsedTime: 0,
    });
  }

  function completeSet() {
    const currentPlan = workoutPlans[progress.currentExerciseIndex];
    if (progress.currentSet < currentPlan.sets) {
      setProgress((p) => ({ ...p, currentSet: p.currentSet + 1, isResting: true }));
    } else {
      if (progress.currentExerciseIndex < workoutPlans.length - 1) {
        setProgress((p) => ({
          ...p,
          currentExerciseIndex: p.currentExerciseIndex + 1,
          currentSet: 1,
          isResting: false,
        }));
      } else {
        finishWorkout();
      }
    }
  }

  function finishWorkout() {
    const detail = workoutPlans.map((plan) => ({
      exerciseName: plan.exercise.name,
      completedSets: plan.sets,
      repsPerSet: plan.reps,
    }));
    const sum: WorkoutSummary = {
      totalTime: progress.elapsedTime,
      details: detail,
    };
    setSummary(sum);
    setScreen("completion");
  }

  return {
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
  };
}
