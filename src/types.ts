export interface Exercise {
  id: string;
  name: string;
  defaultSets: number;
  defaultReps: number;
  defaultRest: number;
}

export interface WorkoutPlan {
  exercise: Exercise;
  sets: number;
  reps: number;
  rest: number;
}

export interface WorkoutProgress {
  currentExerciseIndex: number;
  currentSet: number;
  isResting: boolean;
  elapsedTime: number;
}

export interface WorkoutSummary {
  totalTime: number;
  details: {
    exerciseName: string;
    completedSets: number;
    repsPerSet: number;
  }[];
}
